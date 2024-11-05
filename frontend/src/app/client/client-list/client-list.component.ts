import { Component, inject, OnInit } from '@angular/core';
import { UserClient } from '../../_models/userClient';
import { ClientsService } from '../../_services/clients.service';
import { ClientCardComponent } from '../client-card/client-card.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [ClientCardComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
})
export class ClientListComponent implements OnInit {
  private clientService = inject(ClientsService);
  clients: UserClient[] = [];

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (clients) => (this.clients = clients),
    });
  }
}
