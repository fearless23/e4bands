import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
// import { ProjectService } from './project.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
    // providers: [ProjectService]
})

export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
