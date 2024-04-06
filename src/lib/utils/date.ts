import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(
  dateValue: string | number | Date | dayjs.Dayjs,
  format: string,
) {
  return dayjs(dateValue).format(format);
}
