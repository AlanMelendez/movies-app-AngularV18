import { Component, inject, Input } from '@angular/core';
import { PaginacionDTO } from '../../models/PaginacionDTO';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/proveedores';
import { HttpResponse } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ListadoGenericoComponent } from "../listado-generico/listado-generico.component";
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { IServicioCRUD } from '../../interfaces/IServicioCRUD';

@Component({
  selector: 'app-indice-entidad',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    ListadoGenericoComponent,
    MatTableModule,
    MatPaginatorModule,
    SweetAlert2Module
  ],  templateUrl: './indice-entidad.component.html',
  styleUrl: './indice-entidad.component.css'
})
export class IndiceEntidadComponent<Generico, GenericoCreacionDTO> {

  @Input({required:true}) titulo!:string;
  @Input({required:true}) rutaCrear!:string;
  @Input({required:true}) rutaEditar!:string;
  @Input({required:false}) displayedColumns:string[] = ['id', 'nombre', 'acciones'];
  //==========================================================

  paginacion: PaginacionDTO = {pagina: 1, recordsPorPagina: 10};
  entidades: Generico[]
  cantidadTotalRegistros: number = 0;
  //==========================================================
  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as IServicioCRUD<Generico, GenericoCreacionDTO>;

 //==========================================================

 /**
  *
  */
 constructor() {
  this.cargarRegistros();
 }



 //=========================================================

  actualizarPaginacion(datos: PageEvent){
    this.paginacion = { pagina: datos.pageIndex + 1, recordsPorPagina: datos.pageSize };
    this.cargarRegistros();
  }
  
  cargarRegistros(): void {
    this.servicioCRUD.obtenerPaginacion(this.paginacion)
      .subscribe((respuesta: HttpResponse<Generico[]>) => {
        this.entidades = respuesta.body as Generico[];
        const header = respuesta.headers.get('cantidad-total-resigstros') as string;
        this.cantidadTotalRegistros = parseInt(header,10);
        console.log(respuesta);
      });
  }
  eliminar(id: number): void {
    this.servicioCRUD.eliminar(id)
      .subscribe({
        next: ()=>{
          // this.paginacion={pagina:1,recordsPorPagina:5}
          this.paginacion.pagina=1;
          this.cargarRegistros();
        },
        error: (err)=> {
          console.log('Error desde eliminar: ', err)
        },
      })
  }

 //=========================================================

 toUpper(value:string){
  if(!value){
    return value;
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
 }

}
