import { ProdutoServicoDTO } from './../../models/produtoServico.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { Observable } from 'rxjs';
import { ImageUtilService } from './image-util.service';

@Injectable()
export class ProdutoService{
    constructor(public http: HttpClient,
        public imageUtilService: ImageUtilService){

    }
 
    findAll(): Observable<ProdutoServicoDTO[]>{
        return this.http.get<ProdutoServicoDTO[]>(`${API_CONFIG.baseUrl}/produtoServicos`);
      }
    
    findById(id: string){
         return this.http.get(`${API_CONFIG.baseUrl}/produtoServicos/${id}`);
      }

    findByEstablishment(idEstabelecimento: string): Observable<ProdutoServicoDTO[]>{
        return this.http.get<ProdutoServicoDTO[]>(`${API_CONFIG.baseUrl}/estabelecimentos/${idEstabelecimento}`);
     }

    findPage(page: number = 0, linesPerPage: number = 24) : Observable<ProdutoServicoDTO[]>{
        return this.http.get<ProdutoServicoDTO[]>(`${API_CONFIG.baseUrl}/produtoServicos/page?page=${page}&linesPerPage=${linesPerPage}`);
      }
    
    findPageByEstablishment(page: number = 0, linesPerPage: number = 24, id_estabelecimento: string) : Observable<ProdutoServicoDTO[]>{
        return this.http.get<ProdutoServicoDTO[]>(`${API_CONFIG.baseUrl}/produtoServicos/estabelecimento/${id_estabelecimento}page?page=${page}&linesPerPage=${linesPerPage}`);
      }
    
    upLoadPicture(picture, id: string){
        let picutreBlob = this.imageUtilService.dataUriToBlob(picture);
        let formDate : FormData = new FormData();
        formDate.set('file', picutreBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/produtoServicos/${id}/picture`,
            formDate,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
        }
      
    deletePicture(id: string){
          return this.http.get(`${API_CONFIG.baseUrl}/produtoServicos/${id}/picture`);
      }
      
    getImageFromServer(id: string): Observable<any> {
        let url = `${API_CONFIG.baseUrl}/imagens/pro${id}.jpg`;
        return this.http.get(url, { responseType: 'blob' });
      }
    
    }


