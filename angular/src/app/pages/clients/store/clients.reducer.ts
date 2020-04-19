import * as clientActions from './clients.actions';
import { Client } from '../client.model';
import { ICollection } from 'src/app/store/app.store.module';

const collectionInitState: ICollection<Client> = {
  data: [],
  loaded: false,
};

export function clientsReducer(
  state = collectionInitState,
  action: clientActions.clientActions
) {
  switch (action.type) {
    case clientActions.GET_CLIENTS_COMPLETED:
      return {
        ...state,
        data: action.payload,
        loaded: true
      };
    default:
      return state;
  }
}
