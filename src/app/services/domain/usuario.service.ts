import { SenhaUpdateDTO } from './../../models/senhaUpdate.dto';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"; // HttpHeaders
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { ImageUtilService } from './image-util.service';
import { UsuarioDTO } from '../../models/usuario.dto';
import { StorageService } from '../storage.service';

@Injectable()
export class UsuarioService {
    constructor(public http: HttpClient, 
                public storage: StorageService, 
                public imageUtilService: ImageUtilService) { 
    }
    
    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/usuarios/${id}`);
    }

    findByEmail(email: string) : Observable<UsuarioDTO>{
        return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuarios/email?value=${email}`);
    }

    insert(obj: UsuarioDTO){ 
        return this.http.post(
            `${API_CONFIG.baseUrl}/usuarios`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    update(obj: UsuarioDTO){ 
        return this.http.put(
            `${API_CONFIG.baseUrl}/usuarios/${obj.id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    updatePassword(obj: SenhaUpdateDTO){
        return this.http.put(
         `${API_CONFIG.baseUrl}/usuarios/password`,
         obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );     
    }

    upLoadPicture(picture, id: string){
        let picutreBlob = this.imageUtilService.dataUriToBlob(picture);
        let formDate : FormData = new FormData();
        formDate.set('file', picutreBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/usuarios/picture`,
            formDate,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
        }
      
    deletePicture(id: string){
          return this.http.get(`${API_CONFIG.baseUrl}/usuarios/picture`);
      }
      
    getImageFromServer(id: string): Observable<any> {
        let url = `${API_CONFIG.baseUrl}/imagens/usp${id}.jpg`;
        return this.http.get(url, { responseType: 'blob' });
      }








}