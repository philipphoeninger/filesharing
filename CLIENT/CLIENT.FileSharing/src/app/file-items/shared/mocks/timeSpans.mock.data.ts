import { EnTimeSpan } from '../time-span.enum';
import { ITimeSpan } from '../time-span.interface';

export let MOCK_TIME_SPANS: ITimeSpan[] = [
  { value: EnTimeSpan.Today, label: 'Today' },
  { value: EnTimeSpan.Yesterday, label: 'Yesterday' },
  { value: EnTimeSpan.Last7Days, label: 'Last 7 days' },
  { value: EnTimeSpan.Last30Days, label: 'Last 30 days' },
  {
    value: EnTimeSpan.ThisYear,
    label: 'This year (' + new Date().getFullYear() + ')',
  },
  {
    value: EnTimeSpan.LastYear,
    label: 'Last year (' + (new Date().getFullYear() - 1) + ')',
  },
];
