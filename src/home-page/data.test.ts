import 'jest';

import { getShowFeedbackForm, setShowFeedbackForm, getRequestedSupply, setRequestedSupply } from './data';
import { Supply } from '../supply';

describe(`showFeedbackForm`, () => {
  it(`should return false by default`, () => {
    expect(getShowFeedbackForm()).toEqual(false);
  });

  it(`should set value to true`, () => {
    setShowFeedbackForm(true);
    expect(getShowFeedbackForm()).toEqual(true);
  });

  it(`should set value to false`, () => {
    setShowFeedbackForm(false);
    expect(getShowFeedbackForm()).toEqual(false);
  });
});

describe(`requestedSupply`, () => {
  it(`should return undefined by default`, () => {
    expect(getRequestedSupply()).toEqual(undefined);
  });

  it(`should set value to true`, () => {
    const supply = new Supply();
    setRequestedSupply(supply);
    expect(getRequestedSupply()).toEqual(supply);
  });
});
