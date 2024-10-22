import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpAppConfig } from '../../app.config';
import { Observable, of as observableOf } from 'rxjs';
import { LoginModel } from './login.model';

@Injectable({ providedIn: 'root' })
export class IdentityApiService {
  constructor(private http: HttpClient) {}

  login(command: LoginModel): Observable<any> {
    return this.http.post<any>(`${httpAppConfig.apiEndpoint}/signIn`, command, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
}
