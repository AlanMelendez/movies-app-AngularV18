import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ActoresService } from '../actores.service';
import { PaginacionDTO } from '../../compartidos/models/PaginacionDTO';
import { HttpResponse } from '@angular/common/http';
import { ActorDTO } from '../actores';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ListadoGenericoComponent } from '../../compartidos/componentes/listado-generico/listado-generico.component';

@Component({
  selector: 'app-indice-actores',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatTableModule, MatPaginatorModule, ListadoGenericoComponent],
  templateUrl: './indice-actores.component.html',
  styleUrl: './indice-actores.component.css'
})
export class IndiceActoresComponent {

  actoresService = inject(ActoresService);
  paginacion: PaginacionDTO = {
    pagina: 1,
    recordsPorPagina: 10
  };
  cantidadTotalRegistros: number = 0;
  actores: ActorDTO[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];


  /**
   *
   */
  constructor() {
    this.cargarRegistros();
  }


  cargarRegistros(): void {
    this.actoresService.obtenerPaginado(this.paginacion)
      .subscribe((respuesta: HttpResponse<ActorDTO[]>) => {
        this.actores = respuesta.body as ActorDTO[];
        const header = respuesta.headers.get('cantidad-total-resigstros') as string;
        this.cantidadTotalRegistros = parseInt(header,10);
        console.log(respuesta);
      });
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginacion = { pagina: datos.pageIndex + 1, recordsPorPagina: datos.pageSize };
    this.cargarRegistros();
  }

  eliminar(id: number): void {
    console.log('Eliminar');
  }
}
