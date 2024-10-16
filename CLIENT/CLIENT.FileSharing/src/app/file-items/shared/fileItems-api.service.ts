import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpAppConfig } from '../../app.config';
import { FileItem } from './file-item.model';
import { Observable, of as observableOf } from 'rxjs';
import { MOCK_FILE_ITEMS } from './mocks/fileItems.mock.data';

@Injectable({ providedIn: 'root' })
export class FileItemsApiService {
  constructor(private http: HttpClient) {}

  getFileItems(): Observable<FileItem[]> {
    // return this.http.get<FileItem[]>(`${httpAppConfig.apiEndpoint}/file-items`);
    return observableOf(MOCK_FILE_ITEMS);
  }

  getFileItem(id: number): Observable<FileItem | null> {
    // return this.http.get<FileItem>(`${httpAppConfig.apiEndpoint}/file-items/${id}`);
    return observableOf(
      MOCK_FILE_ITEMS.find((fileItem) => fileItem.id === id) || null,
    );
  }
}
