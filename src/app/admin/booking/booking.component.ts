import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
// import { Observable } from 'rxjs/Observable';
import { TIMESLOTSSTART } from './timeslots';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  today = new Date().toISOString().split('T')[0];
  selectedDate: String = this.today;
  timeSlots = _.cloneDeep(TIMESLOTSSTART);
  slots = [];

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.dateSelected(this.today);
  }

  dateSelected(date) {
    // Getting 2018-02 - YYYY-MM format
    const YM = date.substr(0, 7);
    const slotsObs = this.afs.collection('bookings/' + YM + '/' + date).valueChanges();
    this.timeSlots = _.cloneDeep(TIMESLOTSSTART);
    slotsObs.subscribe(data => {
      this.slots = data;
      if (data.length > 0) {
        for (let i = 0; i < this.slots.length; i++) {
          const j = this.slots[i].hour - 1;
          this.timeSlots[j].booked = this.slots[i].booked;
          this.timeSlots[j]['user'] = this.slots[i].name;
          this.timeSlots[j]['mobile'] = this.slots[i].mobile;
          this.timeSlots[j]['dateOfBooking'] = this.slots[i].dateAdded;
        }
      }
    });


  }


}
