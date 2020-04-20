import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.store.module';
import * as clientActions from './store/clients.actions';
import { Client } from './client.model';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {

  public clients: fromApp.ICollection<Client>;

  constructor(
    private store: Store<fromApp.AppState>,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.store.select('clients').subscribe(clients => {
      this.clients = clients;
    });

    this.store.dispatch(new clientActions.GetClients());
  }

  public deleteClient(clientId: number) {
    this.confirmationService.confirm({
      message: 'ნამდვილად გსურთ წაშლა',
      accept: () => {
        this.store.dispatch(new clientActions.RemoveClient(clientId));
      }
    });
  }

}
