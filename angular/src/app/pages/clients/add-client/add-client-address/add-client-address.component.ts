import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddClientComponent } from '../add-client.component';

@Component({
  selector: 'app-add-client-address',
  templateUrl: './add-client-address.component.html',
  styleUrls: ['../add-client.component.scss']
})
export class AddClientAddressComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() header: string;
  @Input() parentInstance: AddClientComponent;

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
