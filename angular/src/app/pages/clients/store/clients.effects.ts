import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as clientActions from './clients.actions';
import { environment } from 'src/environments/environment';
import { Client } from '../client.model';


@Injectable()
export class ClientEffects {

  @Effect({ dispatch: true })
  getClients = this.actions$.pipe(
    ofType(clientActions.GET_CLIENTS),
    switchMap(() =>
      this.http.get(environment.apiUrl + '/clients').pipe(
        map((data: any[]) => {
          const clients = data.map(c => new Client().deserialize(c));
          return new clientActions.GetClientsCompleted(clients);
        })
      )
  ));

  @Effect({ dispatch: true })
  saveClient = this.actions$.pipe(
    ofType(clientActions.ADD_CLIENT),
    switchMap((action: clientActions.AddClient) => {
      return this.http.post(environment.apiUrl + '/client', action.payload).pipe(
        map((data: any) => {
          const newClient = new Client().deserialize(data);
          return new clientActions.AddClientCompleted(newClient);
        })
      );
    }
  ));

  @Effect({ dispatch: true })
  removeClient = this.actions$.pipe(
    ofType(clientActions.REMOVE_CLIENT),
    switchMap((action: clientActions.RemoveClient) => {
      const clientId = action.payload;
      return this.http.delete(environment.apiUrl + '/client/' + action.payload).pipe(
        map(() => {
          return new clientActions.RemoveClientComplated(clientId);
        })
      );
    }
  ));

  @Effect({ dispatch: true })
  updateClient = this.actions$.pipe(
    ofType(clientActions.UPDATE_CLIENT),
    switchMap((action: clientActions.UpdateClient) => {
      return this.http.put(environment.apiUrl + '/client/' + action.payload.id, action.payload).pipe(
        map((data: any) => {
          const newClient = new Client().deserialize(data);
          return new clientActions.UpdateClientComplated(newClient);
        })
      );
    }
  ));

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }
}
