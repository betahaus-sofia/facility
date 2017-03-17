import 'jest';

import { get, groupBy } from './index';

it(`should get property value`, () => {
  expect(get<{ a: number }>('a')({ a: 1 })).toBe(1);
});

const items = [
  { key: 'a', value: 1 },
  { key: 'a', value: 2 },
  { key: 'b', value: 3 }
];
const groupByKey = groupBy<typeof items[0]>('key');

it(`should group by property name`, () => {
  expect(groupByKey(items)).toEqual({
    a: [
      { key: 'a', value: 1 },
      { key: 'a', value: 2 }
    ],
    b: [
      { key: 'b', value: 3 }
    ]
  });
});
