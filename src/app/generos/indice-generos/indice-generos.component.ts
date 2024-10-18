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

@Component({
  selector: 'app-indice-generos',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    ListadoGenericoComponent,
    MatTableModule,
    MatPaginatorModule,
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
}
