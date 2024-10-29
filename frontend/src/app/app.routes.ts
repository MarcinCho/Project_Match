import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompaniesListComponent } from './companies/companies-list/companies-list.component';
import { CompanyDetailComponent } from './companies/company-detail/company-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ContactDetailsComponent } from './contact/contact-details/contact-details.component';
import { authGuard } from './_guard/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'companies/:id', component: CompanyDetailComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'projects/:id', component: ProjectDetailsComponent },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },
  { path: 'contact', component: ContactDetailsComponent },
  {
    path: 'companies',
    component: CompaniesListComponent,
  },

  { path: '**', component: HomeComponent, pathMatch: 'full' },
];
