import { Component, OnInit } from '@angular/core';
import { AddClientComponent } from '../add-client/add-client.component';
import { FormBuilder } from '@angular/forms';

import * as fromApp from '../../../store/app.store.module';
import * as clientActions from '../store/clients.actions';
import { Store } from '@ngrx/store';
import { Client } from '../client.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-client',
  templateUrl: '../add-client/add-client.component.html',
  styleUrls: ['../add-client/add-client.component.scss']
})
export class EditClientComponent extends AddClientComponent implements OnInit {

  constructor(
    protected fb: FormBuilder,
    protected store: Store<fromApp.AppState>,
    protected messageService: MessageService
  ) {
    super(fb, store, messageService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public openModal(client: Client) {
    this.fillForm(client);
    this.showDialog();
  }

  private fillForm(client: Client) {
    this.clientForm.patchValue(client);
  }

  public saveClient() {
    const formValue = this.clientForm.value;
    if (this.clientForm.valid) {
      this.store.dispatch(new clientActions.UpdateClient(formValue));
    }
  }

}
