import { logger } from 'compote/components/logger';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { Room } from './room';
import { Supply } from './supply';

export interface State {
  rooms: Room[];
  selectedRoom: Room;
  selectedRoomSupplies: Supply[];
  requestedSupply: Supply;
}

export enum Actions {
  ADD_ROOM = 'ADD_ROOM',
  SELECT_ROOM = 'SELECT_ROOM',
  ADD_SUPPLY = 'ADD_SUPPLY',

  SUPPLY_REQUESTED = 'SUPPLY_REQUESTED',
  SET_REQUESTED_SUPPLY = 'SET_REQUESTED_SUPPLY'
}

export const store = createStore(
  combineReducers<State>({ rooms, selectedRoom, selectedRoomSupplies, requestedSupply }),
  process.env.NODE_ENV === 'production' ? undefined : applyMiddleware(logger)
);

// Rooms
type RoomAction = Action<Actions> & { room?: Room };

export function rooms(state: Room[] = [], action: RoomAction = {}): Room[] {
  switch (action.type) {
  case Actions.ADD_ROOM:
    return [...state, action.room];
  }
  return state;
}

// Selected Room
export function selectedRoom(state: Room = null, action: RoomAction = {}): Room {
  switch (action.type) {
  case Actions.SELECT_ROOM:
    return action.room;
  }
  return state;
}

// Selected Room Supplies
type SupplyAction = Action<Actions> & { supply?: Supply, requested?: number };

export function selectedRoomSupplies(state: Supply[] = [], action: SupplyAction = {}): Supply[] {
  switch (action.type) {
  case Actions.SELECT_ROOM:
    return [];
  case Actions.ADD_SUPPLY:
    return [...state, action.supply];
  case Actions.SUPPLY_REQUESTED:
    return state.map(updateSupplyRequestedTime(action.supply, action.requested));
  }
  return state;
}

const updateSupplyRequestedTime = (requestedSupply: Supply, requested: number) => (supply: Supply) => (
  supply !== requestedSupply ? supply : new Supply(supply, { requested })
);

// Requested Supply
type RequestedSupplyAction = Action<Actions> & { supply?: Supply };

export function requestedSupply(state: Supply = null, action: RequestedSupplyAction = {}): Supply {
  switch (action.type) {
  case Actions.SET_REQUESTED_SUPPLY:
    return action.supply;
  }
  return state;
}
