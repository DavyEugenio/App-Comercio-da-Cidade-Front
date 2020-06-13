import { StorageService } from 'src/app/services/storage.service';
import { Observable } from 'rxjs';
import { HttpHandler, HttpRequest, HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        
        let localUser = this.storage.getLocalUser();

        let N = API_CONFIG.baseUrl.length;
        let requestToApi = req.url.substring(0, N) == API_CONFIG.baseUrl;
        
        if(localUser && requestToApi){
            const authReq = req.clone({headers: req.headers.set('Authorization' , 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        }
        else{
            return next.handle(req);
        }      
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};