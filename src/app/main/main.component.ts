import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'qs-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  public user: any;

  routes: Object[] = [{
      title: 'Dashboard',
      route: '/',
      icon: 'dashboard',
    }, {
      title: 'Product Dashboard',
      route: '/product',
      icon: 'view_quilt',
    }, {
      title: 'Product Logs',
      route: '/logs',
      icon: 'receipt',
    }, {
      title: 'Manage Users',
      route: '/users',
      icon: 'people',
    }, {
      title: 'Covalent Templates',
      route: '/templates',
      icon: 'view_module',
    },
  ];

  constructor(private _router: Router, public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      /**
       * displayName:"Julian David"
         email: null
         photoURL: "http://pbs.twimg.com/profile_images/698725049784799232/pnsEpa4-_normal.jpg"
         providerId: "twitter.com"
         uid: "286943973"
       */
      this.user = auth.twitter;
    })
  }

  logout(): void {
    this._router.navigate(['/login']);
  }
}
