import { Action } from '@ngrx/store';
import { Client } from '../client.model';

export const GET_CLIENTS = 'GET_CLIENTS';
export const GET_CLIENTS_COMPLETED = 'GET_CLIENTS_COMPLETED';
export const ADD_CLIENT = 'ADD_CLIENT';
export const ADD_CLIENT_COMPLETED = 'ADD_CLIENT_COMPLETED';
export const REMOVE_CLIENT = 'REMOVE_CLIENT';
export const REMOVE_CLIENT_COMPLETED = 'REMOVE_CLIENT_COMPLETED';
export const UPDATE_CLIENT = 'UPDATE_CLIENT';
export const UPDATE_CLIENT_COMPLETED = 'UPDATE_CLIENT_COMPLETED';

export const GET_CLIENT_DETAILS = 'GET_CLIENT_DETAILS';
export const GET_CLIENT_DETAILS_COMPLETED = 'GET_CLIENT_DETAILS_COMPLETED';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const ADD_ACCOUNT_COMPLETED = 'ADD_ACCOUNT_COMPLETED';
export const CLOSE_ACCOUNT = 'CLOSE_ACCOUNT';
export const CLOSE_ACCOUNT_COMPLETED = 'CLOSE_ACCOUNT_COMPLETED';

export class CloseAccount implements Action {
  readonly type = CLOSE_ACCOUNT;

  constructor(
    public payload: number
  ) { }
}

export class CloseAccountComplated implements Action {
  readonly type = CLOSE_ACCOUNT_COMPLETED;

  constructor(
    public payload: Client
  ) { }
}

export class AddAccount implements Action {
  readonly type = ADD_ACCOUNT;

  constructor(
    public payload: any
  ) { }
}

export class AddAccountCompleted implements Action {
  readonly type = ADD_ACCOUNT_COMPLETED;

  constructor(
    public payload: Client
  ) { }
}

export class GetClientDetailsCompleted implements Action {
  readonly type = GET_CLIENT_DETAILS_COMPLETED;

  constructor(
    public payload: Client
  ) { }
}

export class GetClientDetails implements Action {
  readonly type = GET_CLIENT_DETAILS;

  constructor(
    public payload: number
  ) { }
}

export class UpdateClient implements Action {
  readonly type = UPDATE_CLIENT;

  constructor(
    public payload: any
  ) { }
}

export class UpdateClientComplated implements Action {
  readonly type = UPDATE_CLIENT_COMPLETED;

  constructor(
    public payload: Client
  ) { }
}

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
  | GetClientDetails
  | GetClientDetailsCompleted
  | UpdateClient
  | UpdateClientComplated
  | RemoveClient
  | RemoveClientComplated
  | AddClient
  | AddClientCompleted
  | GetClients
  | GetClientsCompleted;
