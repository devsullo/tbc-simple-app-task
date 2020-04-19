import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { Client } from '../pages/clients/client.model';
import { clientsReducer } from '../pages/clients/store/clients.reducer';
import { ClientEffects } from '../pages/clients/store/clients.effects';

export interface ICollection<T> {
  data: T[];
  loaded: boolean;
}

export interface AppState {
  clients: ICollection<Client>;
}

export const reducers: ActionReducerMap<AppState> = {
  clients: clientsReducer,
};

const effects = [
  ClientEffects,
];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: []
})
export class AppStoreModule { }
