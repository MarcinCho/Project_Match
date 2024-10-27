import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import loginModel from '../_models/login';
import User from '../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'http://localhost:5000/api/';
  currentUser = signal<User | undefined>(undefined);

  login = (model: loginModel) => {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser.set(user);
      })
    );
  };

  register = (model: loginModel) => {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
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
