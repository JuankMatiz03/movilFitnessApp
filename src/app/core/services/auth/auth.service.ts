import { Injectable, inject } from '@angular/core';
import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { LoginModel } from '../../models/auth/login.model';
import { ResponseModel } from '../../models/response/Response.model';
import { RegisterModel } from './../../models/auth/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  authenticatedUser = false;

  private errorHandl(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => error);
  }

  sendLogin(data: LoginModel): Observable<ResponseModel> {
    return this.http.post(environment.backend + 'login', data)
    .pipe(
      map((res: any) => res as ResponseModel),
      retry(1),
      catchError(this.errorHandl)
    )
  }

  createUser(data: RegisterModel): Observable<ResponseModel>  {
    return this.http.post(environment.backend + 'register', data)
    .pipe(
      map((res: any) => res as ResponseModel),
      catchError(this.errorHandl)
    )
  }

  updateProfile(data: RegisterModel, document: string): Observable<ResponseModel>  {
    return this.http.post(environment.backend + `update/${document}`, data)
    .pipe(
      map((res: any) => res as ResponseModel),
      catchError(this.errorHandl)
    )
  }

  logout(): Observable<ResponseModel>  {
    this.authenticatedUser = false;
    return this.http.post(environment.backend + 'logout', {})
    .pipe(
      map((res: any) => res as ResponseModel),
      catchError(this.errorHandl)
    )
  }
}
