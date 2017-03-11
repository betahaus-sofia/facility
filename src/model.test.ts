import 'jest';
import Model from './model';

test('should assign first argument to instance', () => {
  expect(new Model({ a: 1 })).toEqual({ a: 1 });
});

test('should assign all arguments to instance', () => {
  expect(new Model<any>({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
});

test('should override properties', () => {
  expect(new Model({ a: 1 }, { a: 2 }, { a: 3 })).toEqual({ a: 3 });
});
