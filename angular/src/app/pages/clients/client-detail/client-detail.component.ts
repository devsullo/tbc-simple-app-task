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

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    const clientId = Number(this.activatedRoute.snapshot.params.id);
    this.store.dispatch(new clientActions.GetClientDetails(clientId));

    this.store.select('clients').pipe(filter(c => c.loaded))
      .subscribe(clients => {
        this.client = clients.data.find(c => c.id === clientId);
        console.log(clientId, clients, this.client);
      });
  }

  private initForm() {
    this.accountForm = this.fb.group({
      clientId: [null],
      type: ['', Validators.required],
      currency: ['', Validators.required],
    });
  }

  public onFormSubmit() {
    if (!this.accountForm.valid) {
      return;
    }
    console.log(this.accountForm.value)
    this.accountForm.reset();
  }

}
