import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.store.module';
import * as clientActions from './store/clients.actions';
import { Client } from './client.model';
import { ConfirmationService, SortMeta } from 'primeng/api';
import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { Table } from 'primeng/table/table';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit, AfterViewInit {

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

  public queryParams = {
    global: '',
    sortField: '',
    sortOrder: '',
    first: 0,
    rows: 10
  };

  constructor(
    private store: Store<fromApp.AppState>,
    private confirmationService: ConfirmationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
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

  ngAfterViewInit() {
    this.doSortAndFilter();
    this.cdr.detectChanges();
  }

  public onSort(e: SortMeta) {
    const data = { sortField: e.field, sortOrder: e.order};
    this.navigateRoute(data);
  }

  public onFilter() {
    const cols = this.cols.map(c => {
      const data = {};
      data[c.field] = c.value;
      return data;
    });

    this.navigateRoute(Object.assign({}, ...cols));
  }

  public onPage(e: any) {
    this.navigateRoute(e);
  }

  private doSortAndFilter() {
    this.activatedRoute.queryParams.subscribe((query: any) => {
      Object.assign(this.queryParams, query);
      for (const key in query) {
        if (query.hasOwnProperty(key)) {
          const fieldValue = query[key];
          const col = this.cols.find(c => c.field === key);
          if (col) {
            col.value = fieldValue;
            this.dataTable.filter(col.value, col.field, 'contains');
          }
        }
      }
    });
  }

  private navigateRoute(data: any) {
    Object.assign(this.queryParams, data);
    Object.keys(this.queryParams).forEach((key) =>
      (this.queryParams[key] === '') && delete this.queryParams[key]);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.queryParams
    });
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
