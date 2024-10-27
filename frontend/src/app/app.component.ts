import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NavBarComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.setActiveUser();
  }

  setActiveUser(): void {
    const activeUser = localStorage.getItem('user');
    if (!activeUser) return;
    const user = JSON.parse(activeUser);
    this.accountService.currentUser.set(user);
  }
}
