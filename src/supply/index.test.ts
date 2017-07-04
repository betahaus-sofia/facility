import 'jest';

jest.mock('compote/components/logger', () => require('compote/components/logger/index.common.js'));
jest.mock('compote/components/model', () => require('compote/components/model/index.common.js'));
import { Model } from 'compote/components/model';

import { Supply/*, getSupplies, addSupply, requestSupply, supplyRequested*/ } from './index';

it(`should extend Model class`, () => {
  expect(new Supply()).toBeInstanceOf(Model);
});
