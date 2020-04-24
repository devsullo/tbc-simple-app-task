import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientDetailComponent } from './pages/clients/client-detail/client-detail.component';
import { ClientGuard } from './core/client.guard';


const routes: Routes = [
  {
    path: 'clients',
    component: ClientsComponent,
  },
  {
    path: 'client/:id',
    component: ClientDetailComponent,
    canActivate: [ClientGuard]
  },
  { path: '**', redirectTo: '/clients', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
