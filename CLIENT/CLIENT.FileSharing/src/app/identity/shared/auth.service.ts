import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpAppConfig } from '../../app.config';
import { Observable } from 'rxjs';
import { LoginModel } from './login.model';
import { RegisterModel } from './register.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(command: LoginModel): Observable<any> {
    return this.http.post<any>(`${httpAppConfig.apiEndpoint}/signIn`, command);
  }

  register(command: RegisterModel): Observable<any> {
    return this.http.post<any>(`${httpAppConfig.apiEndpoint}/signUp`, command);
  }

  public showLogin() {
    this.router.navigate(['', { outlets: { login: ['auth'] } }]);
  }

  public showRegister() {
    this.router.navigate(['', { outlets: { login: ['register'] } }]);
  }

  public logout() {
    localStorage.removeItem('fileshare-token');
    this.router.navigateByUrl('/(login:auth)');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('fileshare-token');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }
}
