import { Router, ActivatedRoute } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';

import { User } from './user';

declare var window:any;

@Injectable()
export class LoginService {
  public static ultimaRota:String;

  constructor(private router: Router, private route: ActivatedRoute) { }

  doLogin(user: User) {
    if (user.login === 'usuario@email.com' &&
      user.password === '123') {

      user.token = Math.random.toString();

      window.localStorage.setItem('user', JSON.stringify(user));

      const destination = this.route.snapshot.queryParams['destination'] || '/home';
      this.router.navigate([destination]);

    } else {
      this.router.navigate(['/login']);
    }
  }


}