import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IRegister, IUser} from "../interfaces";
import {Observable, tap} from "rxjs";

export interface ILoginPayload {
  email: string;
  password: string;
}

const ACCESS_TOKEN_KEY = 'access_token';

interface JwtAuth {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  profile: IUser | null = null;
  access_token: string;

  constructor(private readonly http: HttpClient) {
    this.access_token = localStorage.getItem(ACCESS_TOKEN_KEY) || '';
  }

  signIn(payload: ILoginPayload): Observable<JwtAuth> {
    return this.http.post<JwtAuth>('http://localhost:3000/auth/signin', payload).pipe(
      tap((res) => {
        this.saveToken(res.access_token)
      })
    )
  }

  signUp(payload: IRegister): Observable<JwtAuth> {
    return this
      .http
      .post<JwtAuth>('http://localhost:3000/auth/signup', payload)
      .pipe(tap((res) => {
        this.saveToken(res.access_token)
      }));
  }

  private saveToken(token: string) {
    this.access_token = token;
    localStorage.setItem(ACCESS_TOKEN_KEY, this.access_token)
  }
}
