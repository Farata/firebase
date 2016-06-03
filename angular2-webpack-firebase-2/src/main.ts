import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router';

if (webpack.ENV === 'production') {
  enableProdMode();
}

import {MyApp} from './app/app';

bootstrap(MyApp, [ROUTER_PROVIDERS]).catch(console.error.bind(console));


declare var firebase: any;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC_9_IUWoZ12tFIlgZ7qwrDuLco74nvBAc",
  authDomain: "angular-webpack2.firebaseapp.com",
  databaseURL: "https://angular-webpack2.firebaseio.com",
  storageBucket: "angular-webpack2.appspot.com",
};

firebase.initializeApp(config);