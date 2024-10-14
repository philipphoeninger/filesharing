import 'reflect-metadata';
import { jsonObject, jsonMember } from 'typedjson';
import { EnFileType } from '../../file-items/shared/file-type.enum';

@jsonObject
export class LinkModel {
  @jsonMember
  id: number;

  @jsonMember
  url: string;

  @jsonMember
  fileType: EnFileType;

  @jsonMember
  createdAt: Date;

  @jsonMember
  validTo: Date;

  @jsonMember
  visits: number;

  @jsonMember
  name?: string;

  constructor(
    pId: number,
    pUrl: string,
    pFileType: EnFileType,
    pCreatedAt: Date,
    pValidTo: Date,
    pVisits: number = 0,
    pName?: string,
  ) {
    this.id = pId;
    this.url = pUrl;
    this.fileType = pFileType;
    this.createdAt = pCreatedAt;
    this.validTo = pValidTo;
    this.visits = pVisits;
    this.name = pName;
  }
}
