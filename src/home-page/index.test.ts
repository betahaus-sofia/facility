import 'jest';

jest.mock('compote/html', () => ({ div: jest.fn(), iframe: jest.fn() }));
jest.mock('compote/css', () => jest.fn());
jest.mock('compote/components/clock', () => require('compote/components/clock/index.common.js'));
jest.mock('compote/components/flex', () => require('compote/components/flex/index.common.js'));
jest.mock('compote/components/logger', () => require('compote/components/logger/index.common.js'));
jest.mock('compote/components/model', () => require('compote/components/model/index.common.js'));
jest.mock('compote/components/timeago', () => require('compote/components/timeago/index.common.js'));
jest.mock('compote/components/utils', () => require('compote/components/utils/index.common.js'));

import { HomePage } from './index';

describe(`HomePage`, () => {
  it(`should return an array`, () => {
    expect(HomePage()).toHaveProperty('length');
  });
});
