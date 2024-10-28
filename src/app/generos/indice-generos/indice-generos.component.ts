import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GenerosService } from '../generos.service';
import { MatButtonModule } from '@angular/material/button';
import { GeneroDTO } from '../generos';
import { ListadoGenericoComponent } from '../../compartidos/componentes/listado-generico/listado-generico.component';
import { MatTableModule } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';
import { PaginacionDTO } from '../../compartidos/models/PaginacionDTO';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SwalComponent, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indice-generos',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    ListadoGenericoComponent,
    MatTableModule,
    MatPaginatorModule,
    SweetAlert2Module
  ],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.css',
})
export class IndiceGenerosComponent {
  generosService = inject(GenerosService);
  generos: GeneroDTO[] = [];

  // Paginacion por defecto
  paginacion: PaginacionDTO = {pagina: 1,recordsPorPagina: 5};
  cantidadTotalRegistros: number;

  displayedColumns = ['id', 'nombre', 'acciones'];

  /**
   *
   */
  constructor() {
    this.cargarRegistros(this.paginacion);
  }

  cargarRegistros(paginacion: PaginacionDTO) {
    this.generosService.obtenerPaginacion(paginacion).subscribe((response: HttpResponse<GeneroDTO[]>) => {
      this.generos = response.body as GeneroDTO[];

      const header = response.headers.get('cantidad-total-registros') as string;
      this.cantidadTotalRegistros = parseInt(header);
      console.log(this.generos);
    });
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginacion = {pagina: (datos.pageIndex + 1), recordsPorPagina: datos.pageSize};
    this.cargarRegistros(this.paginacion);
  }

  eliminar(id:number){

    Swal.fire({
      title: '¿Estas seguro de eliminar este registro?',
      text: "No podras revertir esta acción!",
      icon: 'warning',
      heightAuto: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
          //Restablecer la paginacion (no dejar tabla vacia)
          this.paginacion = {pagina: 1, recordsPorPagina: 5};
          this.generosService.eliminar(id).subscribe(() => {
            this.cargarRegistros(this.paginacion);
          });        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        )
      }
    });


  }
}
