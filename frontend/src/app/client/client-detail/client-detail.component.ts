import { Component, inject, OnInit } from '@angular/core';
import { ClientsService } from '../../_services/clients.service';
import { UserClient } from '../../_models/userClient';
import { ClientCardComponent } from '../client-card/client-card.component';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [TabsModule, GalleryModule],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css',
})
export class ClientDetailComponent implements OnInit {
  private clientService = inject(ClientsService);
  private route = inject(ActivatedRoute);
  client?: UserClient;
  images: GalleryItem[] = [];

  ngOnInit(): void {
    this.loadSingleClient();
  }

  loadSingleClient() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const checkId: number = parseInt(id, 10);
    this.clientService.getClient(checkId).subscribe({
      next: (client) => {
        this.client = client;
        client.photos.map((p) => {
          this.images.push(new ImageItem({ src: p.url, thumb: p.url }));
        });
      },
    });
  }
}
