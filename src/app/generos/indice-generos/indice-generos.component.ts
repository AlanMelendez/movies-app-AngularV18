import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GenerosService } from '../generos.service';
import { MatButtonModule } from '@angular/material/button';
import { GeneroDTO } from '../generos';
import { ListadoGenericoComponent } from '../../compartidos/componentes/listado-generico/listado-generico.component';
import { MatTableModule } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-indice-generos',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    ListadoGenericoComponent,
    MatTableModule,
  ],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.css',
})
export class IndiceGenerosComponent {
  generosService = inject(GenerosService);
  generos: GeneroDTO[] = [];

  displayedColumns = ['id', 'nombre', 'acciones'];

  /**
   *
   */
  constructor() {
    this.generosService.obtenerPaginacion({pagina:1, recordsPorPagina:5}).subscribe((response: HttpResponse<GeneroDTO[]>) => {
      this.generos = response.body as GeneroDTO[];
      console.log(this.generos);
    });
  }
}
