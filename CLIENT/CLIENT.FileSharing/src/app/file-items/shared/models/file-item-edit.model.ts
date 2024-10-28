import { EnFileAction } from './file-action-type.enum';

export interface FileItemEditModel {
  name: string;
  color: string;
  action: EnFileAction;
}
