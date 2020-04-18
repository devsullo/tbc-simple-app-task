import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';

export interface ICollection<T> {
  data: T[];
  loaded: boolean;
}

export interface AppState {
  clients: ICollection<Clients>;
}

export const reducers: ActionReducerMap<AppState> = {
  clients: clientsReducer,
};

const effects = [
  clientEffects,
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
