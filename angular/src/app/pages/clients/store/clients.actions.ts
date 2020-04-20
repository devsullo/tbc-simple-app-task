import { Action } from '@ngrx/store';
import { Client } from '../client.model';

export const GET_CLIENTS = 'GET_CLIENTS';
export const GET_CLIENTS_COMPLETED = 'GET_CLIENTS_COMPLETED';
export const ADD_CLIENT = 'SAVE_CLIENT';
export const ADD_CLIENT_COMPLETED = 'SAVE_CLIENT_COMPLETED';


export class AddClient implements Action {
  readonly type = ADD_CLIENT;

  constructor(
    public payload: any
  ) { }
}

export class AddClientCompleted implements Action {
  readonly type = ADD_CLIENT_COMPLETED;

  constructor(
    public payload: Client
  ) { }
}

export class GetClientsCompleted implements Action {
  readonly type = GET_CLIENTS_COMPLETED;

  constructor(
    public payload: Client[]
  ) { }
}

export class GetClients implements Action {
  readonly type = GET_CLIENTS;
}

export type clientActions =
  | AddClient
  | AddClientCompleted
  | GetClients
  | GetClientsCompleted;
