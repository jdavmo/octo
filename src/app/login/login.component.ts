import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { TdLoadingService } from '@covalent/core';

@Component({
  selector: 'qs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {  

  constructor(private _router: Router,
              private _loadingService: TdLoadingService,
              public af: AngularFire) {
    
    //check auth                
    this.af.auth.subscribe(auth => {
      if (auth) {
        this._router.navigate(['/']);
      }
    })

  }
  //Login with Twitter
  login() {
    this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup,
    });
  }
  //
  overrideLogin() {
    this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    });
  }
}
