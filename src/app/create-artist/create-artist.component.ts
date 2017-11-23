import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html'
})

export class CreateArtistComponent implements OnInit {

  cats;

  userId;
  userImg;

  createArtistForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.cats = this.afs.doc('lists/categories').valueChanges();

    this.createArtistForm = this.fb.group({
      'name': [null, Validators.required],
      'mobile': [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(7000000000),
          Validators.max(9999999999)
        ])
      ],
      'category': [null, Validators.required],
      'band': [null, Validators.required],
      'city': [null, Validators.required],
      'bio': [null, Validators.compose([
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(300)
      ])],

    });

    this.afa.authState.subscribe(data => {
      if (data) {
        this.userId = data.uid;
        this.userImg = data.photoURL;
      }
    });
  }

  createArtist(data) {
    const PUSHKEY = this.afs.createId();
    const ARTIST = {
      'pushKey': PUSHKEY,
      'imageURL': this.userImg,
      'createdBy': this.userId,
      'dateAdded': new Date().getTime(),
      ...data
    };
    this.afs.collection('artists').doc(PUSHKEY).set(ARTIST);
    this.router.navigateByUrl('/artist/' + PUSHKEY);
  }



}


