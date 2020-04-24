import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = {};
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = { severity: 'error', summary: `Error`, detail: error.error.message };
          } else {
            // server-side error
            errorMessage = { severity: 'error', summary: `Error Code: ${error.status}`, detail: error.message };
          }
          this.messageService.add(errorMessage);
          return throwError(errorMessage);
        })
      );
  }
}
