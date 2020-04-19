import { Action } from '@ngrx/store';
import { Client } from '../client.model';

export const GET_CLIENTS = 'GET_CLIENTS';
export const GET_CLIENTS_COMPLETED = 'GET_CLIENTS_COMPLETED';

export class GetClients implements Action {
  readonly type = GET_CLIENTS;
}

export class GetClientsCompleted implements Action {
  readonly type = GET_CLIENTS_COMPLETED;

  constructor(
    public payload: Client[]
  ) { }
}

export type clientActions =
  | GetClients
  | GetClientsCompleted;
