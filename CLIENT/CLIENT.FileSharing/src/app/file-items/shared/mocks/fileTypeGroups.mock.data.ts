import { IFileTypeGroup } from '../models/file-type-group.interface';
import { EnFileType } from '../models/file-type.enum';

export let MOCK_FILE_TYPE_GROUPS: IFileTypeGroup[] = [
  {
    name: 'General',
    fileTypes: [
      { value: EnFileType.Document, label: 'Document' },
      { value: EnFileType.Folder, label: 'Folder' },
      { value: EnFileType.Image, label: 'Images & Pictures' },
      { value: EnFileType.Video, label: 'Videos' },
      { value: EnFileType.Other, label: 'Other' },
    ],
  },
  {
    name: 'Specific',
    fileTypes: [
      { value: EnFileType.Table, label: 'Table' },
      { value: EnFileType.Folder, label: 'Form' },
      { value: EnFileType.Zip, label: 'Zip' },
    ],
  },
];
