import 'jest';

import Model from '../model';
import { Room/*, getRooms, addRoom, selectRoom*/ } from './room';

test('should extend Model class', () => {
  expect(new Room()).toBeInstanceOf(Model);
});
