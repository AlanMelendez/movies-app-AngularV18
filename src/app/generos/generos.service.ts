import { Injectable } from '@angular/core';
import { GeneroDTO } from './generos';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  constructor() { }

  public getAll(): GeneroDTO[] {
    return [
      { id: 1, nombre: 'Acción' },
      { id: 2, nombre: 'Aventura' },
    ];
  }
}
