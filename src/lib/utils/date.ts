const REGEX_FORMAT =
  /\[([^\]]+)]|Y{1,4}|M{1,2}|D{1,2}|d{1}|H{1,2}|h{1,2}|A|m{1,2}|s{1,2}|SSS/g;
const timezoneOffsetMinutes = new Date().getTimezoneOffset();

const padZero = (v: unknown, length = 2) => String(v).padStart(length, '0');

export function fromMySQLToLocalDate(dateStr: string) {
  const iso = dateStr.replace(' ', 'T') + 'Z';
  const timestamp = new Date(iso).getTime() - timezoneOffsetMinutes * 60 * 1000;
  return new Date(timestamp);
}

export function toMySQLDate(date: Date) {
  return formatDate('YYYY-MM-DD HH:mm:ss', date);
}

export function formatDate(format: string, dateValue: string | number | Date) {
  const date = new Date(dateValue);

  const dt = {
    y: date.getUTCFullYear(),
    M: date.getUTCMonth() + 1,
    D: date.getUTCDate(),
    d: date.getUTCDay(),
    H: date.getUTCHours(),
    h: 0,
    m: date.getUTCMinutes(),
    s: date.getUTCSeconds(),
    ms: date.getUTCMilliseconds(),
  };
  dt.h = dt.H % 12 || 12;

  const matches = {
    YY: String(dt.y).slice(-2),
    YYYY: dt.y,
    M: dt.M,
    MM: padZero(dt.M),
    D: dt.D,
    DD: padZero(dt.D),
    d: dt.d,
    H: dt.H,
    HH: padZero(dt.H),
    h: dt.h,
    hh: padZero(dt.h),
    m: dt.m,
    mm: padZero(dt.m),
    s: dt.s,
    ss: padZero(dt.s),
    SSS: padZero(dt.ms, 3).substring(0, 3),
    A: dt.H < 12 ? 'AM' : 'PM',
  };

  return format.replace(
    REGEX_FORMAT,
    (match, $1) => $1 || (matches as any)[match],
  );
}
