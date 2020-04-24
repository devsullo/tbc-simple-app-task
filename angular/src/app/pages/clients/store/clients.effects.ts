import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as clientActions from './clients.actions';
import { environment } from 'src/environments/environment';
import { Client } from '../client.model';
import { MessageService } from 'primeng/api/';


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
          this.toastMsg('კლიენტი დაემატა');
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
          this.toastMsg();
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
          this.toastMsg('კლიენტის მონაცემები შენახულია');
          const newClient = new Client().deserialize(data);
          return new clientActions.UpdateClientComplated(newClient);
        })
      );
    }
  ));

  // Client details

  @Effect({ dispatch: true })
  getClientDetails = this.actions$.pipe(
    ofType(clientActions.GET_CLIENT_DETAILS),
    switchMap((action: clientActions.GetClientDetails) =>
      this.http.get(environment.apiUrl + '/client/' + action.payload).pipe(
        map((data: any) => {
          const newClient = new Client().deserialize(data);
          return new clientActions.GetClientDetailsCompleted(newClient);
        })
      )
    ));

  @Effect({ dispatch: true })
  addAccount = this.actions$.pipe(
    ofType(clientActions.ADD_ACCOUNT),
    switchMap((action: clientActions.AddAccount) => {
      return this.http.post(environment.apiUrl + '/account', action.payload).pipe(
        map((data: any) => {
          this.toastMsg('ანგარიში დაემატა');
          return new clientActions.GetClientDetails(data.clientId);
        })
      );
    }
    ));

  @Effect({ dispatch: true })
  closeAccount = this.actions$.pipe(
    ofType(clientActions.CLOSE_ACCOUNT),
    switchMap((action: clientActions.CloseAccount) => {
      return this.http.put(environment.apiUrl + '/account/close/' + action.payload, {}).pipe(
        map((data: any) => {
          this.toastMsg('ანგარიში დაიხურა');
          return new clientActions.GetClientDetails(data.clientId);
        })
      );
    }
    ));

  private toastMsg(msg = '') {
    this.messageService.add({ severity: 'success', summary: 'ოფერაცია წარმატებით დასრულდა', detail: msg });
  }

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private messageService: MessageService
  ) { }
}
