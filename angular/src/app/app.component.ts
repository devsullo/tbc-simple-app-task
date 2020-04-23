import { Component } from '@angular/core';
import * as fromApp from './store/app.store.module';
import * as clientActions from './pages/clients/store/clients.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  constructor(store: Store<fromApp.AppState>) {
    store.dispatch(new clientActions.GetClients());
  }
}
