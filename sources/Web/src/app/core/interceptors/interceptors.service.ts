/**
* http interceptor
* Interceptors provide a mechanism to intercept and/or mutate outgoing requests or incoming responses, features like caching and logging.
* @package InterceptorsService
* @subpackage app\core\interceptors\interceptorservice
* @author SEPA Cyber Technologies, Sayyad M.
*/
import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotificationService } from '../toastr-notification/toastr-notification.service';


@Injectable()
export class InterceptorsService implements HttpInterceptor {
  userInfo: string;
  profileData: any;
  constructor(private alert:NotificationService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers:  req.headers.set('content-type', 'application/json').set('x-auth-token',sessionStorage.getItem('x-auth-token')),
      responseType: 'json',
    });
    return next.handle(req)
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}Message: ${error.message}`;
        }
        this.alert.error(errorMessage);  
        return throwError(errorMessage);
      })
    );
  }
}


