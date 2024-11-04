import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ActorCreacionDTO, ActorDTO } from './actores';
import { Observable } from 'rxjs';
import { PaginacionDTO } from '../compartidos/models/PaginacionDTO';

import { construirQueryParams } from '../compartidos/functions/constuirQueryParams';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio para gestionar actores.
 *
 * Este servicio proporciona métodos para crear y gestionar actores en la aplicación.
 * Utiliza HttpClient para realizar solicitudes HTTP al API.
 *
 * @class
 */
export class ActoresService implements IServicioCRUD<ActorDTO,ActorCreacionDTO> {

  private httpClient: HttpClient = inject(HttpClient);
  private urlBase: string = `${environment.apiURL}/actores`;
  /**
   * Crea una nueva instancia de ActoresService.
   *
   * @constructor
   */
  constructor() { }





  /**
   * Crea un nuevo actor.
   *
   * Este método envía una solicitud POST al API para crear un nuevo actor.
   * La información del actor se envía como un objeto FormData, que incluye
   * la foto del actor si está disponible.
   *
   * @param {ActorCreacionDTO} actor - Los datos del actor a crear.
   * @returns {Observable<Actor>}  Un observable que emite el actor creado.
   */
  public crear(actor: ActorCreacionDTO): Observable<ActorDTO> {
    const formData = this.construirFormDate(actor);
    return this.httpClient.post<ActorDTO>(`${environment.apiURL}/actores`, formData);
   }


  obtenerPaginacion(paginacion: PaginacionDTO): Observable<HttpResponse<ActorDTO[]>> {
    let queryParams =  construirQueryParams(paginacion);

    return this.httpClient.get<ActorDTO[]>(`${this.urlBase}`, { observe: 'response', params: queryParams });

  }

  public obtenerPorId(id: number): Observable<ActorDTO> {
    return this.httpClient.get<ActorDTO>(`${this.urlBase}/${id}`);
  }

  public editar(id: number, actor: ActorCreacionDTO): Observable<void> {
    const formData = this.construirFormDate(actor);
    return this.httpClient.put<void>(`${this.urlBase}/${id}`, formData);
  }

  public eliminar(id:number){
    return this.httpClient.delete<void>(`${this.urlBase}/${id}`);
  }







  /**
   * Construye un objeto FormData a partir de los datos del actor.
   *
   * Este método convierte los datos del actor en un objeto FormData,
   * que es necesario para enviar archivos (como la foto del actor) al API.
   *
   * @private
   * @param {ActorCreacionDTO} actor - Los datos del actor.
   * @returns {FormData} Un objeto FormData con los datos del actor.
   */
  private construirFormDate(actor: ActorCreacionDTO): FormData {
    const formData = new FormData();
    formData.append('nombre', actor.nombre);

    if (actor.fechaNacimiento) {
      formData.append('fechaNacimiento', actor.fechaNacimiento.toISOString().split('T')[0]);
    }
    if (actor.foto) {
      formData.append('foto', actor.foto);
    }
    return formData;

  }

}
