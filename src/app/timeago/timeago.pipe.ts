import { Pipe } from '@angular/core';

@Pipe({ name: 'timeago' })
export class TimeagoPipe {
  transform(date: Date | string | number, withoutSuffix: boolean): string {
    return moment(date).fromNow(withoutSuffix);
  }
}

@Pipe({ name: 'timeagoImpure', pure: false })
export class TimeagoImpurePipe {
  transform(date: Date | string | number, withoutSuffix: boolean): string {
    return moment(date).fromNow(withoutSuffix);
  }
}
