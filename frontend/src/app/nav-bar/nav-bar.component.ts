import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import Login from '../_models/login';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    FormsModule,
    BsDropdownModule,
    RouterLink,
    RouterLinkActive,
    TitleCasePipe,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toaster = inject(ToastrService);
  model: Login = {
    username: '',
    password: '',
  };

  login() {
    this.accountService.login(this.model).subscribe({
      next: (): void => {
        this.router.navigateByUrl('/companies');
      },
      error: (error) => {
        this.toaster.error(error.error);
      },
    });
  }
  logout() {
    this.accountService.logout();
  }
}
