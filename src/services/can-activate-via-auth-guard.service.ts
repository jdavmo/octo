import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class CanActivateViaAuthGuardService {

  private auth: any;

  constructor(public af: AngularFire, private _router: Router) {
    this.af.auth.subscribe(auth => {
      this.auth = auth;
    })
   }

  canActivate() {
    if (!this.auth) {
      this._router.navigate(['/login']);
      return false;
    }else {
      return true;
    }
  }
}
