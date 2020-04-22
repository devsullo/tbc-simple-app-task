import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.store.module';
import * as clientActions from './store/clients.actions';
import { Client } from './client.model';
import { ConfirmationService } from 'primeng/api';
import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { environment } from 'src/environments/environment';
import { Table } from 'primeng/table/table';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {

  get globalFilterFields(): string[] {
    return this.cols.map(c => c.field);
  }

  @ViewChild('addClientModal')
  public addClientModal: AddClientComponent;

  @ViewChild('editClientModal')
  public editClientModal: EditClientComponent;

  @ViewChild('dataTable')
  public dataTable: Table;

  public clients: fromApp.ICollection<Client>;

  public clientsData: Client[];

  public cols = [
    { field: 'id', placeholder: 'მოძებნე ნომრით', th: 'ნომერი', value: ''},
    { field: 'fullName', placeholder: 'მოძებნე სახ.გვარ.', th: 'კლიენტი', value: ''},
    { field: 'sex', placeholder: 'მოძებნე სქესით', th: 'სქესი', value: ''},
    { field: 'personalNumber', placeholder: 'მოძებნე პრ.ნომრით', th: 'პირადი ნომერი', value: ''},
    { field: 'phone', placeholder: 'მოძებნე მობ.ნომრით', th: 'მობილური', value: ''},
    { field: 'fullLegalAddress', placeholder: 'მოძებნე მის.', th: 'იურიდიული მის', value: ''},
    { field: 'fullActualAddress', placeholder: 'მოძებნე მის.', th: 'ფაქტიური მის'}
  ];

  public globalSearchInput = '';

  constructor(
    private store: Store<fromApp.AppState>,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.store.select('clients').subscribe(clients => {
      this.clients = clients;
      if (this.clients.loaded) {
        // For immutably sorting
        this.clientsData = [...this.clients.data];
      }
    });

    this.store.dispatch(new clientActions.GetClients());

  }

  public onSort(e) {
    console.warn(e);
  }

  public onFilter(e) {
    console.warn(e);
  }

  public onAddClient() {
    this.addClientModal.showDialog();
  }

  public onDeleteClient(clientId: number) {
    this.confirmationService.confirm({
      message: 'ნამდვილად გსურთ წაშლა',
      accept: () => {
        this.store.dispatch(new clientActions.RemoveClient(clientId));
      }
    });
  }

  public onEditClient(client: Client) {
    this.editClientModal.openModal(client);
  }

}
