import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.store.module';
import * as clientActions from '../store/clients.actions';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Client } from '../client.model';
import { filter } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss', '../clients.component.scss']
})
export class ClientDetailComponent implements OnInit {

  public client: Client;

  public accountTypeOptions: SelectItem[] = [
    { label: 'მიმდინარე', value: 'მიმდინარე' },
    { label: 'შემნახველი', value: 'შემნახველი' },
    { label: 'დაგროვებითი', value: 'დაგროვებითი' },
  ];

  public accountCurrencyOptions: SelectItem[] = [
    { label: 'GEL', value: 'GEL' },
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'RUB', value: 'RUB' },
  ];

  public accountForm: FormGroup;

  public clientId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.clientId = Number(this.activatedRoute.snapshot.params.id);
    this.initForm();
    this.store.dispatch(new clientActions.GetClientDetails(this.clientId));

    this.store.select('clients').pipe(filter(c => c.loaded))
      .subscribe(clients => {
        this.client = clients.data.find(c => c.id === this.clientId);
      });
  }

  private initForm() {
    this.accountForm = this.fb.group({
      clientId: [],
      type: ['', Validators.required],
      currency: ['', Validators.required],
    });
  }

  public onFormSubmit() {
    if (!this.accountForm.valid) {
      return;
    }
    this.accountForm.get('clientId').setValue(this.clientId);
    const formValue = this.accountForm.value;
    this.store.dispatch(new clientActions.AddAccount(formValue));
    this.accountForm.reset();
  }

  public onCloseAccount(accountId: number) {
    this.store.dispatch(new clientActions.CloseAccount(accountId));
  }

}
