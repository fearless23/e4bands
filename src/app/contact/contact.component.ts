import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})

export class ContactComponent implements OnInit {

  userQueries;
  contactForm: FormGroup;

  userId;
  userName;
  userEmail;

  isFormSubmitted: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private afa: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      'title': [null, Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(60)
      ])],
      'queryType': [null, Validators.required],
      'message': [null, Validators.compose([
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(300)
      ])]
    });

    this.afa.authState.subscribe(data => {
      if (data) {
        this.userId = data.uid;
        this.userName = data.displayName;
        this.userEmail = data.email;
      }
    });
  }

  sendContactForm(data) {
    const PUSHKEY = this.afs.createId();
    const CONTACT_MESSAGE = {
      'pushKey': PUSHKEY,
      'userName': this.userName,
      'userId': this.userId,
      'userEmail': this.userEmail,
      'dateAdded': new Date().getTime(),
      ...data
    };
    this.afs.collection('userQueries').doc(PUSHKEY).set(CONTACT_MESSAGE);
    this.isFormSubmitted = true;
  }
}
