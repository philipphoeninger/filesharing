import { ITimeSpan } from '../../../file-items/shared/models/time-span.interface';
import { EnTimeSpanFuture } from '../time-span.enum';

export let MOCK_TIME_SPANS_FUTURE: ITimeSpan[] = [
  { value: EnTimeSpanFuture.Today, label: 'Today' },
  { value: EnTimeSpanFuture.Tomorrow, label: 'Tomorrow' },
  { value: EnTimeSpanFuture.Next7Days, label: 'Next 7 days' },
  { value: EnTimeSpanFuture.Next30Days, label: 'Next 30 days' },
];
