import { Component, inject, input, output } from '@angular/core';
import UserRegistration from '../_models/UserRegistration';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();

  model: UserRegistration = {
    username: '',
    password: '',
  };

  register() {
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
