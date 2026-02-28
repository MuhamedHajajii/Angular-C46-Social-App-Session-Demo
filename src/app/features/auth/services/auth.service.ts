import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { App_Apis } from '../../../core/constants/app-apis';
import { IAuthResponse } from '../interfaces/IAuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  register(userData: {}) {
    return this.http.post<IAuthResponse>(App_Apis.auth.register, userData);
  }

  login(userData: {}) {
    return this.http.post<IAuthResponse>(App_Apis.auth.login, userData);
  }
}
