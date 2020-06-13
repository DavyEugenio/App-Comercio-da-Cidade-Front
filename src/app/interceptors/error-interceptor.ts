import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { Observable } from 'rxjs';
import { HttpHandler, HttpRequest, HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService, private router: Router, public alertCtrl: AlertController){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(catchError((error, caught) => {

            let errorObj = error;
            if (errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            console.log("Error detectado pelo interceptor");
            console.log(errorObj);

            switch(errorObj.status){
                
                case 401:
                this.handle401();
                break;
                
                case 403:
                this.handle403();
                break;
                default:
                    this.handleDefaultError(errorObj);
                    break;
            }

            
            throw(error);
            
        })) as any;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }

    async handle401() {
        const alert = await this.alertCtrl.create({
            header: 'Erro 401: Falha de autenticação',
            message: 'Email ou senha incorretos',
            backdropDismiss: false,
            buttons: [{
                text: 'Ok'
            }]
            
        });
        await alert.present();
    }

    async handleDefaultError(errorObj){
        const alert = await this.alertCtrl.create({
            header: 'Error' +errorObj.status + ': ' +errorObj.error,
            message: errorObj.message,
            backdropDismiss: false,
            buttons: [{
                text: 'Ok'
            }]
            
        });
        await alert.present();
    }


}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};