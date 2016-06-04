export class Request {
  id: string;
  room_supply: string;
  date: number;

  constructor(request) {
    for (let key in request) {
      if (request.hasOwnProperty(key)) {
        this[key] = request[key];
      }
    }
  }
}
