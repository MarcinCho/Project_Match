import { Component, input } from '@angular/core';
import { UserClient } from '../../_models/userClient';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css',
})
export class ClientCardComponent {
  client = input.required<UserClient>();
}
