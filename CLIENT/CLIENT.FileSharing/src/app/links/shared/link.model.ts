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
  lastChanged: Date;

  @jsonMember
  owner: string;

  @jsonMember
  visits: number;

  @jsonMember
  name?: string;

  @jsonMember
  description?: string;

  constructor(
    pId: number,
    pUrl: string,
    pFileType: EnFileType,
    pCreatedAt: Date,
    pValidTo: Date,
    pLastChanged: Date,
    pOwner: string,
    pVisits: number = 0,
    pName?: string,
    pDescription?: string,
  ) {
    this.id = pId;
    this.url = pUrl;
    this.fileType = pFileType;
    this.createdAt = pCreatedAt;
    this.validTo = pValidTo;
    this.lastChanged = pLastChanged;
    this.owner = pOwner;
    this.visits = pVisits;
    this.name = pName;
    this.description = pDescription;
  }
}
