import 'reflect-metadata';
import { jsonObject, jsonMember, jsonArrayMember } from 'typedjson';

@jsonObject
export class FileItem {
  @jsonMember
  id: number;

  @jsonMember
  name: string;

  @jsonMember
  createdAt: Date;

  @jsonMember
  lastChanged: Date;

  @jsonMember
  isFolder: boolean;

  @jsonMember
  fileSize?: number;

  @jsonArrayMember(FileItem)
  fileItems?: { $id: number; $values: FileItem[] };

  constructor(
    pId: number,
    pName: string,
    pCreatedAt: Date,
    pLastChanged: Date,
    pIsFolder = false,
    pFileSize?: number,
    fileItems?: { $id: number; $values: FileItem[] },
  ) {
    this.id = pId;
    this.name = pName;
    this.createdAt = pCreatedAt;
    this.lastChanged = pLastChanged;
    this.isFolder = pIsFolder;
    this.fileSize = pFileSize;
    this.fileItems = fileItems;
  }
}
