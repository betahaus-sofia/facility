import 'jest';

import { Route } from 'mithril';

interface MockRoute extends jest.Mock<Route>, Route {
}

const route: MockRoute = <any>jest.fn();
route.prefix = jest.fn();

jest.mock('mithril', () => ({ route }));
jest.mock('compote/html', (value: any) => value);
jest.mock('compote/css', (value: any) => value);
jest.mock('compote/components/flex', (value: any) => value);
jest.mock('compote/components/timeago', (value: any) => value);

import { initializeRouter } from './index';

describe(`initializeRouter`, () => {
  beforeEach(() => {
    initializeRouter();
  });

  it(`should set prefix to ''`, () => {
    expect(route.prefix).toHaveBeenCalledWith('');
  });

  it(`should define home route`, () => {
    const lastRouteCall = route.mock.calls[route.mock.calls.length - 1];
    expect(lastRouteCall[0]).toEqual(document.querySelector('#container')); // actually null
    expect(lastRouteCall[1]).toEqual('/');
    expect(lastRouteCall[2]['/']).toBeTruthy();
    expect(typeof lastRouteCall[2]['/'].onmatch).toEqual('function');
    expect(typeof lastRouteCall[2]['/'].render).toEqual('function');
  });
});
