export default function timeago(date: Date | string | number, withoutSuffix?: boolean): string {
  return moment(date).fromNow(withoutSuffix);
}
