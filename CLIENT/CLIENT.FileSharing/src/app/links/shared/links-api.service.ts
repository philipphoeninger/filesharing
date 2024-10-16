import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { LinkModel } from './link.model';
import { httpAppConfig } from '../../app.config';
import { MOCK_LINKS } from './mocks/links.mock.data';

@Injectable({ providedIn: 'root' })
export class LinksApiService {
  constructor(private http: HttpClient) {}

  getLinks(): Observable<LinkModel[]> {
    // return this.http.get<LinkModel[]>(`${httpAppConfig.apiEndpoint}/links`);
    return observableOf(MOCK_LINKS);
  }

  getLink(id: number): Observable<LinkModel | null> {
    // return this.http.get<LinkModel>(`${httpAppConfig.apiEndpoint}/links/${id}`);
    return observableOf(MOCK_LINKS.find((link) => link.id === id) || null);
  }
}
