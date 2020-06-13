import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoDTO } from 'src/app/models/estado.dto';
import { API_CONFIG } from 'src/app/config/api.config';


@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(public http: HttpClient,) { }

  findAll(): Observable<EstadoDTO>{
    return this.http.get<EstadoDTO>(`${API_CONFIG.baseUrl}/estados/`);
  }

  findById(id: string): Observable<EstadoDTO[]> {
    return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados/${id}`);
  }

  findByCity(id: string): Observable<EstadoDTO[]> {
    return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados/${id}/cidades`);
  }
  


  
}