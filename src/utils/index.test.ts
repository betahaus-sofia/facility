import 'jest';

import { get, groupBy, keys/*, uniqueId*/ } from './index';

describe(`get`, () => {
  it(`should get property value`, () => {
    expect(get<{ a: number }>('a')({ a: 1 })).toBe(1);
  });
});

describe(`get`, () => {
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
});

describe(`keys`, () => {
  it(`should return object keys`, () => {
    expect(keys({ a: 1, b: 2, c: 3 })).toEqual(['a', 'b', 'c']);
  });
});

// describe(`uniqueId`, () => {
//   it(`should increment ID`, () => {
//     expect(uniqueId()).toBe('0');
//     expect(uniqueId()).toBe('1');
//   });
//
//   it(`should have individual counter for each prefix`, () => {
//     expect(uniqueId('a')).toBe('a0');
//     expect(uniqueId('b')).toBe('b0');
//   });
// });
