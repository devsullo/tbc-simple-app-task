import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.store.module';
import * as clientActions from '../store/clients.actions';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss'],
})
export class AddClientComponent implements OnInit {

  public title = 'კლიენტის დამატება';
  public display = false;
  public clientForm: FormGroup;
  public nameRegExp: RegExp = /^(?!(?=.*[A-Za-z])(?=.*[ა-ჰ]))([A-Za-zა-ჰ]){2,50}$/;
  public errors = {
    required: 'ველი სავალდებულოა',
    name: 'ველი უნდა შეიცავდეს 2-50 სიმბოლოს, უნდა იყოს მხოლოდ ქართული ან ლათინური ანბანის ასოები',
  };

  constructor(
    private fb: FormBuilder,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      sex: ['', Validators.required],
      personalNumber: ['', Validators.required],
      phone: ['', Validators.required],
      legalAddress: this.fb.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
        address: ['', Validators.required]
      }),
      actualAddress: this.fb.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
        address: ['', Validators.required]
      }),
      avatar: ['']
    });
  }

  public saveClient() {
    const formValue = this.clientForm.value;
    if (this.clientForm.valid) {
      this.store.dispatch(new clientActions.AddClient(formValue));
    }
  }

  public getErrorCondition(name: string, formGroup: FormGroup = this.clientForm) {
    const control = formGroup.get(name);
    return control.invalid && (control.dirty || control.touched);
  }

  public showDialog() {
    this.display = true;
  }


}
