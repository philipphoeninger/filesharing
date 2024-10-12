import 'reflect-metadata';
import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class FileItem {
  @jsonMember
  id: number;

  @jsonMember
  name: string;

  @jsonMember
  createdAt: Date;

  @jsonMember
  isFolder: boolean;

  @jsonMember
  fileSize?: number;

  constructor(
    pId: number,
    pName: string,
    pCreatedAt: Date,
    pIsFolder = false,
    pFileSize?: number,
  ) {
    this.id = pId;
    this.name = pName;
    this.createdAt = pCreatedAt;
    this.isFolder = pIsFolder;
    this.fileSize = pFileSize;
  }
}
