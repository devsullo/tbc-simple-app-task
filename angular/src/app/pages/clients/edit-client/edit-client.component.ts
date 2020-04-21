import { Component, OnInit } from '@angular/core';
import { AddClientComponent } from '../add-client/add-client.component';
import { FormBuilder } from '@angular/forms';

import * as fromApp from '../../../store/app.store.module';
import * as clientActions from '../store/clients.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-edit-client',
  templateUrl: '../add-client/add-client.component.html',
  styleUrls: ['../add-client/add-client.component.scss']
})
export class EditClientComponent extends AddClientComponent implements OnInit {

  constructor(
    protected fb: FormBuilder,
    protected store: Store<fromApp.AppState>,
  ) {
    super(fb, store);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
