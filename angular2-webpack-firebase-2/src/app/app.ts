import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';

import {Home} from './home/home';
import {About} from './about/about';

declare var firebase: any;

@Component({
  selector: 'my-app',
  styles: [require('./app.css')],
  template: require('./app.html'),
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/',      component: Home},
  {path: '/about', component: About}
])
export class MyApp {
  currentUser: any;
  errorMessage: string;

  get currentUserName(): string {
    return this.currentUser ? this.currentUser.displayName : 'unauthenticated';
  };


  login() {
    var githubProvider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(githubProvider).then(result => {
      // The signed-in user info.
      this.currentUser = result.user;

    }).catch(error => console.log(error));
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.currentUser = null;
    });
  }
}
