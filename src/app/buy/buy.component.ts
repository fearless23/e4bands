import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html'
})

export class BuyComponent implements OnInit {

  cats: Observable<any>;
  /// unwrapped arrays from firebase
  products: any;
  filteredProducts: any;
  /// filter-able properties
  category: string;
  city: string;
  price: number;
  /// Active filter rules
  filters = {};
  length;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.cats = this.afs.doc('lists/categories').valueChanges();
    this.afs.collection('products').valueChanges().subscribe(products => {
        this.products = products;
        this.applyFilters();
      });
  }
  private applyFilters() {
    this.filteredProducts = _.filter(this.products, _.conforms(this.filters));
    this.length = this.filteredProducts.length;
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
