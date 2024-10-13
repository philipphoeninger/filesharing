import { IFileType } from './file-type.interface';

export interface IFileTypeGroup {
  disabled?: boolean;
  name: string;
  fileTypes: IFileType[];
}
