import { inject, Injectable } from '@angular/core';
import { GeneroDTO } from './generos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  private httpClient = inject(HttpClient);

  constructor() { }

  public getAll(): GeneroDTO[] {
    return [
      { id: 1, nombre: 'Acción' },
      { id: 2, nombre: 'Aventura' },
    ];
  }

  public obtenerTodos(): Observable<GeneroDTO[]> {
    return this.httpClient.get<GeneroDTO[]>('http://localhost:5234/api/generos');
  }
}
