import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private sessionService: SessionService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.sessionService.getToken()){
      request = request.clone({
        setHeaders: {
          Authorization: this.sessionService.getToken()
        }
      });
    }

    return next.handle(request);
  }
}
