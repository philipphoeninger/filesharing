import { DirectoryPathModel } from './directory-path.interface';
import { FileItem } from './file-item.model';

export interface FileItemResponseModel {
  fileItem: FileItem;
  directoryPath: { $id: number; $values: DirectoryPathModel[] };
}
