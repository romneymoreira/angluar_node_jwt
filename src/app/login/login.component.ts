import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginService } from '../shared/services/login.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    user: any;
    spinner$: Observable<boolean>;
    constructor(public router: Router, public loginService: LoginService) {
        this.user = {
            username: 'romney',
            password: '123456',
            id: 1,
            name: 'Romney Moreira',
            email: 'romneymoreira@gmail.com'
        };
    }

    ngOnInit() {
        this.spinner$ = this.loginService.spinner$;
    }

    onLoggedin() {
        this.loginService
        .login(this.user)
        .subscribe(result => {
            const token = `Bearer ${result.token}`;
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('user', this.user);
            localStorage.setItem('token', result.token);
            this.router.navigate(['dashboard']);
        },
        err => {
          console.log(err);
        }
      );
    }
}
