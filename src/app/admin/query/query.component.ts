import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// import { ProjectService } from '../project.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-query',
  templateUrl: './query.component.html'
})
export class QueryComponent implements OnInit {

  project: Observable<any>;
  // projectKey;

  constructor(
    // private mps: ProjectService,
    private afa: AngularFireAuth
  ) {}

  ngOnInit() {}

}
