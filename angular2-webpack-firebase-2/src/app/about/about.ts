import {Component, OnDestroy} from '@angular/core';
import {OnActivate, Router, RouteSegment} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

declare var firebase: any;

@Component({
  selector: 'my-about',
  styles: [require('./about.css')],
  template: require('./about.html'),
})
export class About implements OnActivate, OnDestroy {
  currentUser: any;
  products: string[];

  constructor(private router: Router) {}

  routerOnActivate(curr: RouteSegment, prev?: RouteSegment) {
    this.currentUser = firebase.auth().currentUser;

    if (!this.currentUser) {

      // Observable.timer() to avoid using browser's API directly.
      Observable.timer(5000).subscribe(() => {

        let previousPageUrl = prev.stringifiedUrlSegments;
        this.router.navigateByUrl(previousPageUrl);

      });
    }

    firebase.database().ref('products').on('value', snapshot => {
      this.products = snapshot.val();
    });
  }

  ngOnDestroy() {
    firebase.database().ref('products').off();
  }
}
