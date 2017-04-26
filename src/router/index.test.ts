import 'jest';

import { Route } from 'mithril';
import { last } from '../utils';

interface MockRoute extends jest.Mock<Route>, Route {
}

const route: MockRoute = <any>jest.fn();
route.prefix = jest.fn();

jest.mock('mithril', () => ({ route }));
jest.mock('compote/html', (value: any) => ({ div: jest.fn(), path: jest.fn(), svg: jest.fn() }));
jest.mock('compote/css', (value: any) => value);
jest.mock('compote/components/flex', (value: any) => value);
jest.mock('compote/components/timeago', (value: any) => value);

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
