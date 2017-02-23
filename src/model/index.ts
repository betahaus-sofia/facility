export default class Model<T> {
  constructor(data?: Partial<T>) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        (<any>this)[key] = (<any>data)[key];
      }
    }
  }
}
