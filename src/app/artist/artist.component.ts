import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})

export class ArtistComponent implements OnInit {

  artist: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(`artists/${params.id}`);
      this.artist = this.afs.doc(`artists/${params.id}`).valueChanges();
      this.artist.subscribe( a => console.log(a));
    }
    );
  }

}
