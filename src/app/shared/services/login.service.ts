import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(protected http: HttpClient) { }
  spinner$ = new BehaviorSubject<boolean>(false);
  baseUrl = 'http://localhost:9000';
  login(user: any) {
    this.spinner$.next(true);
    return this.http.post<any>(this.baseUrl + '/login', user).pipe(
      tap(() => this.spinner$.next(false))
    );
  }
}
