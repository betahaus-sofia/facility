export class Supply {
  id: string;
  name: string;
  imageUrl: string;
  number: number;

  constructor(supply) {
    for (let key in supply) {
      if (supply.hasOwnProperty(key)) {
        this[key] = supply[key];
      }
    }
  }
}
