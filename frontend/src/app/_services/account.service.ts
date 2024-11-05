import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import loginModel from '../_models/login';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import Login from '../_models/login';
import UserRegistration from '../_models/UserRegistration';
import { CurrentUser } from '../_models/currentUser';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  currentUser = signal<CurrentUser | undefined>(undefined);

  login = (model: loginModel) => {
    return this.http.post<Login>(this.baseUrl + 'account/login', model).pipe(
      map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);
      })
    );
  };

  register = (model: loginModel) => {
    return this.http
      .post<UserRegistration>(this.baseUrl + 'account/register', model)
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        })
      );
  };

  logout = () => {
    localStorage.removeItem('user');
    this.currentUser.set(undefined);
  };
}
