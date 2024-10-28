import { EnTimeSpanFuture } from '../../../links/shared/time-span.enum';
import { EnTimeSpan } from './time-span.enum';

export interface ITimeSpan {
  value: EnTimeSpan | EnTimeSpanFuture;
  label: string;
}
