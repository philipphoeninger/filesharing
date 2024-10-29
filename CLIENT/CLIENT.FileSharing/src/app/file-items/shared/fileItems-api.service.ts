import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpAppConfig } from '../../app.config';
import { FileItem } from './models/file-item.model';
import { Observable } from 'rxjs';
import { FileItemResponseModel } from './models/fileItem-response.interface';

@Injectable({ providedIn: 'root' })
export class FileItemsApiService {
  constructor(private http: HttpClient) {}

  getFileItemById(id: number): Observable<FileItemResponseModel> {
    return this.http.get<FileItemResponseModel>(
      `${httpAppConfig.apiEndpoint}/FileItems/withPath/${id}`,
    );
  }

  getFileItems(): Observable<FileItem[]> {
    return this.http.get<FileItem[]>(`${httpAppConfig.apiEndpoint}/FileItems`);
  }
}
