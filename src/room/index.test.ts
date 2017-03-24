import 'jest';

import Model from '../model';
import { Room, getRooms, addRoom, selectRoom } from './index';
import Actions from '../actions';
import store from '../store';

describe(`Room`, () => {
  it(`should extend Model class`, () => {
    expect(new Room()).toBeInstanceOf(Model);
  });
});

describe(`getRooms`, () => {
  it(`should unsubscribe & subscribe from 'rooms/child_added'`, () => {
    const off = jest.fn();
    const on = jest.fn();
    const ref = jest.fn(() => ({ off, on }));
    (<any>window).firebase = { database: jest.fn(() => ({ ref })) };

    getRooms();
    expect(ref).toHaveBeenCalledWith('rooms');
    expect(off).toHaveBeenCalledWith('child_added');
    expect(on).toHaveBeenCalledWith('child_added', addRoom);
  });
});

describe(`addRoom`, () => {
  it(`should dispatch ADD_ROOM action`, () => {
    store.dispatch = jest.fn();
    addRoom({ key: 'a', val: () => ({ name: 'b' }) });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: Actions.ADD_ROOM,
      room: { id: 'a', name: 'b' }
    });
  });

  it(`should select room if none selected`, () => {
    store.getState = jest.fn(() => ({ selectedRoom: null }));
    addRoom({ key: 'a', val: () => ({ name: 'b' }) });
    expect(store.getState).toHaveBeenCalled();
  });

  it(`should not select room if already selected`, () => {
    store.getState = jest.fn(() => ({ selectedRoom: { id: 'a', name: 'b' } }));
    addRoom({ key: 'c', val: () => ({ name: 'd' }) });
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
