import { createStore, combineReducers } from 'redux';

import Actions from './actions';
import { Room } from './room';
import { Supply } from './supply';

type State = {
  rooms: Room[]
  selectedRoom: Room
  selectedRoomSupplies: Supply[]
};

type Action = {
  [key: string]: any;
  type?: Actions
};

const stateReducer = combineReducers<State>({
  rooms(state: Room[] = [], action: Action = {}): Room[] {
    switch (action.type) {
    case Actions.ADD_ROOM:
      return [...state, action['room']];
    default:
      return state;
    }
  },

  selectedRoom(state: Room = null, action: Action = {}): Room {
    switch (action.type) {
    case Actions.SELECT_ROOM:
      return action['room'];
    default:
      return state;
    }
  },

  selectedRoomSupplies(state: Supply[] = [], action: Action = {}): Supply[] {
    switch (action.type) {
    case Actions.ADD_SUPPLY:
      return [...state, action['supply']];
    case Actions.SUPPLY_REQUESTED:
      const requestedSupply = action['supply'];
      return state.map((supply) => (
        supply !== requestedSupply ? supply : { ...requestedSupply, requested: action['requested'] }
      ));
    default:
      return state;
    }
  }
});

const Store = createStore(stateReducer);
export default Store;
