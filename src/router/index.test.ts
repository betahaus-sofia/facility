import 'jest';

import { Route } from 'mithril';
interface MockRoute extends jest.Mock<Route>, Route {}
const route: MockRoute = <any>jest.fn();
route.prefix = jest.fn();

jest.mock('mithril', () => ({ route }));
jest.mock('compote/html', () => ({ div: jest.fn(), path: jest.fn(), svg: jest.fn() }));
jest.mock('compote/css', jest.fn());
jest.mock('compote/components/clock', () => require('compote/components/clock/index.common.js'));
jest.mock('compote/components/flex', () => require('compote/components/flex/index.common.js'));
jest.mock('compote/components/timeago', () => require('compote/components/timeago/index.common.js'));
jest.mock('compote/components/utils', () => require('compote/components/utils/index.common.js'));

import { last } from 'compote/components/utils';

import { initializeRouter, HomePage } from './index';
import { getRooms } from '../room';

describe(`initializeRouter`, () => {
  beforeEach(() => {
    initializeRouter();
  });

  it(`should set prefix to ''`, () => {
    expect(route.prefix).toHaveBeenCalledWith('');
  });

  it(`should use container element`, () => {
    expect(last(route.mock.calls)[0]).toEqual(document.querySelector('#container')); // actually null
  });

  it(`should use home route as default route`, () => {
    expect(last(route.mock.calls)[1]).toEqual('/');
  });

  it(`should define home route`, () => {
    expect(last(route.mock.calls)[2]['/']).toMatchObject({ onmatch: getRooms, render: HomePage });
  });
});

describe(`HomePage`, () => {
  it(`should return an array`, () => {
    expect(HomePage()).toHaveProperty('length');
  });
});
