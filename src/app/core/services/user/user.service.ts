import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { LoginModel } from '../../models/auth/login.model';
import { ResponseModel } from '../../models/response/Response.model';
import { RegisterModel } from '../../models/auth/register.model';
import { CaloriesModel } from '../../models/calories/calories.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient);

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

  getCaloriesById(document: string): Observable<ResponseModel> {
    return this.http.get(environment.backend + `calories/${document}`)
    .pipe(
      map((res: any) => res as ResponseModel),
      catchError(this.errorHandl)
    )
  }

  createCalories(data: CaloriesModel): Observable<ResponseModel> {
    return this.http.post(environment.backend + `calories/add`, data)
    .pipe(
      map((res: any) => res as ResponseModel),
      catchError(this.errorHandl)
    )
  }

  getProfile(document: string): Observable<ResponseModel>  {
    return this.http.get(environment.backend + `user/${document}`)
    .pipe(
      map((res: any) => res as ResponseModel),
      catchError(this.errorHandl)
    )
  }

  updateUser(document:string, data: RegisterModel): Observable<ResponseModel>  {
    return this.http.put(environment.backend + `update/${document}`, data)
    .pipe(
      map((res: any) => res as ResponseModel),
      catchError(this.errorHandl)
    )
  }

}
