import { HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { PaginacionDTO } from '../models/PaginacionDTO';


export interface IServicioCRUD<Generico, GenericoCreacionDTO>{

    obtenerPaginacion(paginacion: PaginacionDTO): Observable<HttpResponse<Generico[]>>;

    obtenerPorId(id: number): Observable<Generico>;

    editar(id: number, entidad: GenericoCreacionDTO): Observable<any>;

    crear(entidad: GenericoCreacionDTO): Observable<Generico>;
     
    eliminar(id:number): Observable<any>;



}