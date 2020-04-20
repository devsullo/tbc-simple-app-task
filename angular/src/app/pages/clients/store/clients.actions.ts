import { Action } from '@ngrx/store';
import { Client } from '../client.model';

export const GET_CLIENTS = 'GET_CLIENTS';
export const GET_CLIENTS_COMPLETED = 'GET_CLIENTS_COMPLETED';
export const ADD_CLIENT = 'ADD_CLIENT';
export const ADD_CLIENT_COMPLETED = 'ADD_CLIENT_COMPLETED';
export const REMOVE_CLIENT = 'REMOVE_CLIENT';
export const REMOVE_CLIENT_COMPLETED = 'REMOVE_CLIENT_COMPLETED';

export class RemoveClient implements Action {
  readonly type = REMOVE_CLIENT;

  constructor(
    public payload: number
  ) { }
}

export class RemoveClientComplated implements Action {
  readonly type = REMOVE_CLIENT_COMPLETED;

  constructor(
    public payload: number
  ) { }
}

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
  | RemoveClient
  | RemoveClientComplated
  | AddClient
  | AddClientCompleted
  | GetClients
  | GetClientsCompleted;
