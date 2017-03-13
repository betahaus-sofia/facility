import 'jest';

import Model from '../model';
import { Room/*, getRooms, addRoom, selectRoom*/ } from './index';

it(`should extend Model class`, () => {
  expect(new Room()).toBeInstanceOf(Model);
});
