import { inject, Injectable } from '@angular/core';
import { GeneroDTO } from './generos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  private httpClient = inject(HttpClient);
  private urlBase = environment.apiURL + '/generos';

  constructor() { }

  public getAll(): GeneroDTO[] {
    return [
      { id: 1, nombre: 'Acción' },
      { id: 2, nombre: 'Aventura' },
    ];
  }

  public obtenerTodos(): Observable<GeneroDTO[]> {
    return this.httpClient.get<GeneroDTO[]>(this.urlBase);
  }
}
