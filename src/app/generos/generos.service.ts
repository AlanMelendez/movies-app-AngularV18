import { inject, Injectable } from '@angular/core';
import { GeneroCreacionDTO, GeneroDTO } from './generos';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PaginacionDTO } from '../compartidos/models/PaginacionDTO';
import { construirQueryParams } from '../compartidos/functions/constuirQueryParams';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';

@Injectable({
  providedIn: 'root'
})
export class GenerosService implements IServicioCRUD<GeneroDTO,GeneroCreacionDTO> {

  private httpClient = inject(HttpClient);
  private urlBase = environment.apiURL + '/generos';

  constructor() { }

  public getAll(): GeneroDTO[] {
    return [
      { id: 1, nombre: 'Acción' },
      { id: 2, nombre: 'Aventura' },
    ];
  }

  public obtenerPaginacion(paginacion: PaginacionDTO): Observable<HttpResponse<GeneroDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.httpClient.get<GeneroDTO[]>(this.urlBase, { params: queryParams, observe: 'response' });
  }

  public crear(genero: GeneroCreacionDTO): Observable<GeneroDTO> {
    return this.httpClient.post<GeneroDTO>(this.urlBase, genero);
  }

  public obtenerPorId(id: number): Observable<GeneroDTO> {
    return this.httpClient.get<GeneroDTO>(`${this.urlBase}/${id}`);
  }

  public editar(id: number, genero: GeneroCreacionDTO): Observable<void> {
    return this.httpClient.put<void>(`${this.urlBase}/${id}`, genero);
  }

  public eliminar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlBase}/${id}`);
  }
}
