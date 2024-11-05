import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserClient } from '../_models/userClient';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getClients() {
    return this.http.get<UserClient[]>(this.baseUrl + 'users');
  }

  getClient(id: number) {
    return this.http.get<UserClient>(this.baseUrl + 'users/' + id);
  }
}
