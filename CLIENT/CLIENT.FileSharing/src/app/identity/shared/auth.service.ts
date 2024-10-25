import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpAppConfig } from '../../app.config';
import { Observable } from 'rxjs';
import { LoginModel } from './login.model';
import { RegisterModel } from './register.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(command: LoginModel): Observable<any> {
    return this.http.post<any>(`${httpAppConfig.apiEndpoint}/signIn`, command);
  }

  register(command: RegisterModel): Observable<any> {
    return this.http.post<any>(`${httpAppConfig.apiEndpoint}/signUp`, command);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('fileshare-token');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }
}
