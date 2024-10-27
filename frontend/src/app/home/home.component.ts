import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';
import User from '../_models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.getUsers();
  }
  registerMode = false;
  http = inject(HttpClient);
  users: any;

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelReg(event: boolean) {
    this.registerMode = event;
  }

  getUsers() {
    this.http.get('http://localhost:5000/api/users').subscribe({
      next: (response) => (this.users = response),
      error: () => {
        console.error('Error');
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
