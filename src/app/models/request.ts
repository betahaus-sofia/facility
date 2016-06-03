export class Request {
  id: string;
  supply: string;
  date: string;

  constructor(request) {
    for (let key in request) {
      if (request.hasOwnProperty(key)) {
        this[key] = request[key];
      }
    }
  }
}
