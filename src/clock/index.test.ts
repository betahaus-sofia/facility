import 'jest';
jest.mock('compote/html', (value: any) => ({
  svg: () => ({ tag: 'svg' }),
  circle: () => ({ tag: 'circle' }),
  line: () => ({ tag: 'line' })
}));

import { minutesToXY, Clock } from './index';

describe('Clock', () => {
  it('should work for 0', () => {
    const [x, y] = minutesToXY(0);
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(-1);
  });

  it('should work for 15', () => {
    const [x, y] = minutesToXY(15);
    expect(x).toBeCloseTo(1);
    expect(y).toBeCloseTo(0);
  });

  it('should work for 30', () => {
    const [x, y] = minutesToXY(30);
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(1);
  });

  it('should work for 45', () => {
    const [x, y] = minutesToXY(45);
    expect(x).toBeCloseTo(-1);
    expect(y).toBeCloseTo(0);
  });

  it('should return same value for 0 and 60', () => {
    const [x0, y0] = minutesToXY(0);
    const [x60, y60] = minutesToXY(60);
    expect(x0).toBeCloseTo(x60);
    expect(y0).toBeCloseTo(y60);
  });
});

describe('Clock', () => {
  it('should render SVG', () => {
    expect(Clock(new Date()).tag).toBe('svg');
  });
});
