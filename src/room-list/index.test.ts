import 'jest';

jest.mock('compote/html', (value: any) => value);
jest.mock('compote/components/flex', (value: any) => value);

import { isSelected } from './index';
import { store } from '../store';

describe(`without selected room`, () => {
  beforeEach(() => {
    store.getState = jest.fn(() => ({ selectedRoom: null }));
  });

  afterEach(() => {
    expect(store.getState).toHaveBeenCalled();
  });

  it(`should return false`, () => {
    expect(isSelected({ id: 'a' })).toBe(false);
  });
});

describe(`with selected room`, () => {
  beforeEach(() => {
    store.getState = jest.fn(() => ({ selectedRoom: { id: 'a' } }));
  });

  afterEach(() => {
    expect(store.getState).toHaveBeenCalled();
  });

  it(`should return true if IDs are equal`, () => {
    expect(isSelected({ id: 'a' })).toBe(true);
  });

  it(`should return false if IDs are not equal`, () => {
    expect(isSelected({ id: 'b' })).toBe(false);
  });
});
