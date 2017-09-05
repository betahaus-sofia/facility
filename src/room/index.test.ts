import 'jest';

jest.mock('compote/components/logger', () => require('compote/components/logger/index.common.js'));
jest.mock('compote/components/model', () => require('compote/components/model/index.common.js'));
import { Model } from 'compote/components/model';

jest.mock('firebase/app', () => ({
  database: () => ({
    ref: jest.fn(() => ({
      off: jest.fn(),
      on: jest.fn()
    }))
  })
}));
// import * as firebase from 'firebase/app';

import { Room, /*getRooms,*/ addRoom, selectRoom } from './index';
import { Actions, store } from '../store';

describe(`Room`, () => {
  it(`should extend Model class`, () => {
    expect(new Room()).toBeInstanceOf(Model);
  });
});

// describe(`getRooms`, () => {
//   it(`should unsubscribe & subscribe from 'rooms/child_added'`, () => {
//     getRooms();
//     expect(firebase.database().ref).toHaveBeenCalledWith('rooms');
//     expect(firebase.database().ref('rooms').off).toHaveBeenCalledWith('child_added');
//     expect(firebase.database().ref('rooms').on).toHaveBeenCalledWith('child_added', addRoom);
//   });
// });

describe(`addRoom`, () => {
  it(`should dispatch ADD_ROOM action`, () => {
    store.dispatch = jest.fn();
    addRoom(<any>{ key: 'a', val: () => ({ name: 'b' }) });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: Actions.ADD_ROOM,
      room: { id: 'a', name: 'b' }
    });
  });

  it(`should select room if none selected`, () => {
    store.getState = jest.fn(() => ({ selectedRoom: null }));
    addRoom(<any>{ key: 'a', val: () => ({ name: 'b' }) });
    expect(store.getState).toHaveBeenCalled();
  });

  it(`should not select room if already selected`, () => {
    store.getState = jest.fn(() => ({ selectedRoom: { id: 'a', name: 'b' } }));
    addRoom(<any>{ key: 'c', val: () => ({ name: 'd' }) });
    expect(store.getState).toHaveBeenCalled();
  });
});

describe(`selectRoom`, () => {
  it(`should dispatch SELECT_ROOM action`, () => {
    const selectedRoom: Room = { id: 'a', name: 'b' };
    const selectedRoomSupplies: any[] = [];
    store.getState = jest.fn(() => ({ selectedRoom, selectedRoomSupplies }));
    store.dispatch = jest.fn();

    const room: Room = { id: 'c', name: 'd' };
    selectRoom(room);

    expect(store.getState).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith({ type: Actions.SELECT_ROOM, room });
  });
});
