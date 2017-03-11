import 'jest';

import Model from '../model';
import { Supply/*, getSupplies, addSupply, requestSupply, supplyRequested*/ } from './supply';

test('should extend Model class', () => {
  expect(new Supply()).toBeInstanceOf(Model);
});
