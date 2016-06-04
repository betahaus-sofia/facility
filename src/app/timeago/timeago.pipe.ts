import { Pipe } from '@angular/core';

@Pipe({ name: 'timeago' })
export class TimeagoPipe {
  transform(date: Date | string | number, withoutSuffix: boolean): string {
    return moment(date).fromNow(withoutSuffix);
  }
}
