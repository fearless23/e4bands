import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})

export class SellComponent implements OnInit {

  cats: Observable<any>;

  productsRef: AngularFirestoreCollection<any>;
  exchangeProductsRef: AngularFirestoreCollection<any>;

  createProductForm: FormGroup;
  createExchangeProductForm: FormGroup;

  storageRef;
  progress;
  imageName;
  imageURL;
  imageUploaded = false;

  soldByUserId;
  soldByUserName;

  loggedIn = false;
  isSelling = false;
  isExchanging = false;

  constructor (
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {

    this.cats = this.afs.doc('lists/categories').valueChanges();

    this.productsRef = this.afs.collection('products');
    this.exchangeProductsRef = this.afs.collection('exchangeProducts');

    this.createProductForm = this.fb.group({
      'name': [null, Validators.required],
      'category': [null, Validators.required],
      'price': [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(100),
          Validators.max(1000000)
        ])
      ],
      'description': [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(300)
        ])
      ],
      'age': [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(30)
        ])
      ],
      'color': null,
      'material': null,
      'brand': null,
      'features': this.fb.array(
        [[null, Validators.required], null, null],
        Validators.required
      ),
      'city': [null, Validators.required],
      'mobile': [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(7000000000),
          Validators.max(9999999999)
        ])
      ],
      'sold': false
    });

    this.createExchangeProductForm = this.fb.group({
      'name': [null, Validators.required],
      'category': [null, Validators.required],
      'description': [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(300)
        ])
      ],
      'age': [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(30)
        ])
      ],
      'color': null,
      'material': null,
      'brand': null,
      'features': this.fb.array(
        [[null, Validators.required], null, null],
        Validators.required
      ),
      'city': [null, Validators.required],
      'mobile': [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(7000000000),
          Validators.max(9999999999)
        ])
      ],
      'exchangeWith': [null, Validators.required],
      'exchangeInfo': [null,
        Validators.compose([
          Validators.required,
          Validators.minLength(30),
          Validators.maxLength(300)
        ])
      ],
      'exchanged': false
    });

    this.afa.authState.subscribe(data => {
      if (data) {
        this.soldByUserId = data.uid;
        this.soldByUserName = data.displayName;
        this.loggedIn = true;
      }
    });

    this.storageRef = firebase.storage().ref();
  }

  createProduct(data) {
    const PUSHKEY = this.afs.createId();
    const PRODUCT = {
      'dateAdded': new Date().getTime(),
      'pushKey': PUSHKEY,
      'soldByUserId': this.soldByUserId,
      'soldByUserName': this.soldByUserName,
      ...data
    };
    this.productsRef.doc(PUSHKEY).set(PRODUCT);
    this.router.navigateByUrl('/product/' + PUSHKEY);
  }

  createExchangeProduct(data) {
    const PUSHKEY = this.afs.createId();
    const EXCHANGE_PRODUCT = {
      'dateAdded': new Date().getTime(),
      'pushKey': PUSHKEY,
      'soldByUserId': this.soldByUserId,
      'soldByUserName': this.soldByUserName,
      ...data
    };
    this.exchangeProductsRef.doc(PUSHKEY).set(EXCHANGE_PRODUCT);
    this.router.navigateByUrl('/exchange-product/' + PUSHKEY);
  }

  // uploadImg(event) {
  //   const image = event.srcElement.files[0];
  //   this.imageName = image.name;
  //   const path = 'productImages/' + image.name;
  //   const productImagesRef = this.storageRef.child(path);
  //   const uploadTask = productImagesRef.put(image);

  //   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //     (snapshot) => {
  //       // Upload Progress
  //       this.progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 10000) / 100;
  //     },
  //     (error) => {
  //       // Upload Failed
  //       console.log('The Error while Uploading' + error);
  //     },
  //     () => {
  //       // Upload completed successfully, now we can get the download URL
  //       console.log('Image Uploaded at - ' + uploadTask.snapshot.downloadURL);
  //       this.imageURL = uploadTask.snapshot.downloadURL;
  //       this.imageUploaded = true;
  //     }
  //   );
  // }

  /// Better Solution at
  /// https://stackoverflow.com/questions/42184800/how-to-validate-formarray-length-in-angular2
  /// for features or Reactive Forms Array
  /// https://plnkr.co/edit/cfi7nN?p=preview
}
