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
    case clientActions.ADD_CLIENT_COMPLETED:
      const clients = [...state.data, ...[action.payload]];
      return {
        ...state,
        data: clients,
        loaded: true
      };
    case clientActions.REMOVE_CLIENT_COMPLETED:
      const newClients = state.data.filter(c => c.id !== action.payload);
      return {
        ...state,
        data: newClients,
        loaded: true
      };
    case clientActions.UPDATE_CLIENT_COMPLETED:
    case clientActions.GET_CLIENT_DETAILS_COMPLETED:
      const oldIndex = state.data.findIndex(({ id }) => id === action.payload.id);
      const updatedClients = Object.assign([...state.data], { [oldIndex]: action.payload });
      return {
        ...state,
        data: updatedClients,
        loaded: true
      };
    default:
      return state;
  }
}
