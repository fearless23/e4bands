import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-exchange-product',
  templateUrl: './exchange-product.component.html',
  styleUrls: ['./exchange-product.component.css']
})

export class ExchangeProductComponent implements OnInit {

  productKeyFromRoute;
  productRef;
  product: Observable<any[]>;

  storageRef;
  progress;
  imageName;
  imageURL;
  imageUploaded = false;

  uid;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => this.productKeyFromRoute = params['id']);
    const url = 'exchangeProducts/' + this.productKeyFromRoute;
    this.productRef = this.afs.doc(url);
    this.product = this.productRef.valueChanges();
    this.storageRef = firebase.storage().ref();
    this.afa.authState.subscribe(data => {
      if (data) { this.uid = data.uid; }
    });
  }

  removeProduct() {
    this.productRef.delete();
    this.router.navigateByUrl('buy');
  }

  uploadImg(event) {
    const image = event.srcElement.files[0];
    this.imageName = image.name;
    const path = 'exchangeProductImages/' + this.productKeyFromRoute + '/' + image.name;
    const productImagesRef = this.storageRef.child(path);
    const uploadTask = productImagesRef.put(image);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // Upload Progress
        this.progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 10000) / 100;
      },
      (error) => {
        // Upload Failed
        console.log('The Error while Uploading' + error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        console.log('Image Uploaded at - ' + uploadTask.snapshot.downloadURL);
        this.imageURL = uploadTask.snapshot.downloadURL;
        this.imageUploaded = true;
        this.productRef.update({ 'imageURL': this.imageURL });
      }
    );
  }
}
