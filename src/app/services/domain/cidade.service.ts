import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CidadeDTO } from 'src/app/models/cidade.dto';
import { API_CONFIG } from 'src/app/config/api.config';



@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  constructor(public http: HttpClient) { 
  	
  }
  // findAll(): Observable<CidadeDTO[]> {
  //   return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/cidades`);
  // }
  findAll(): Array<CidadeDTO> {
    return [
      {
        id : "1",
        nome : "Ouricuri"
      },
      {
        id : "2",
        nome : "Bodocó"
      },
      {
        id : "3",
        nome : "Trindade"
      },
      {
        id : "4",
        nome : "Araripina"
      }
    ]
  }

  findById(id: string){
    return this.http.get(`${API_CONFIG.baseUrl}/cidades/${id}`);
  }

  findPage(page: number = 0, linesPerPage: number = 24) : Observable<CidadeDTO[]>{
    return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/cidades/page?page=${page}&linesPerPage=${linesPerPage}`);
  }

 
}