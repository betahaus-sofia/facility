import * as moment from 'moment';

export default function timeago(date: Date | string | number, withoutSuffix?: boolean): string {
  return (<any>moment)(date).fromNow(withoutSuffix);
}
