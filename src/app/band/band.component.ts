import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'app-band',
  templateUrl: './band.component.html',
  styleUrls: ['./band.component.css']
})

export class BandComponent implements OnInit {

  cats: Observable<any>;
  // unwrapped arrays from firebase
  artists: any;
  filteredArtists: any;
  // filter-able properties
  category: string;
  city: string;
  band: string;
  // Active filter rules
  filters = {};
  length;

  constructor(private afs: AngularFirestore) {}

  ngOnInit () {
    this.cats = this.afs.doc('lists/categories').valueChanges();
    this.afs.collection('artists').valueChanges()
      .subscribe(artists => {
        this.artists = artists;
        this.applyFilters();
      });
  }

  private applyFilters() {
    this.filteredArtists = _.filter(this.artists, _.conforms(this.filters));
    this.length = this.filteredArtists.length;
  }
  /// filter property by equality to rule
  filterExact(property: string, rule: any) {
    this.filters[property] = val => val === rule;
    this.applyFilters();
  }
  /// filter  numbers greater than rule
  filterGreaterThan(property: string, rule: number) {
    this.filters[property] = val => val > rule;
    this.applyFilters();
  }

  /// filter  numbers greater than rule
  filterLessThan(property: string, rule: number) {
    this.filters[property] = val => val < rule;
    this.applyFilters();
  }

  /// filter properties that resolve to true
  filterBoolean(property: string, rule: boolean) {
    if (!rule) {
      this.removeFilter(property);
    } else {
      this.filters[property] = val => val;
      this.applyFilters();
    }
  }
  /// removes filter
  removeFilter(property: string) {
    delete this.filters[property];
    this[property] = null;
    this.applyFilters();
  }

}
