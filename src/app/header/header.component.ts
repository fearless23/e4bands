import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  loggedIn = false;
  userPhoto;
  name;

  constructor(public afa: AngularFireAuth, private router: Router) {}

  ngOnInit () {
    this.afa.authState.subscribe(data => {
      if (data) {
        this.loggedIn = true;
        this.userPhoto = data.photoURL;
        this.name = data.displayName;
      }
    });
  }

  logout() {
    this.afa.auth.signOut();
    this.loggedIn = false;
    this.router.navigateByUrl('');
    console.log('Logging Out');
  }
}


