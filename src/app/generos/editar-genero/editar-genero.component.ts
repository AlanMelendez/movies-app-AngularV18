import { Component, inject, Input, numberAttribute } from '@angular/core';
import { FormularioGeneroComponent } from "../formulario-genero/formulario-genero.component";
import { GeneroCreacionDTO, GeneroDTO } from '../generos';
import { GenerosService } from '../generos.service';
import { CargandoComponent } from '../../compartidos/componentes/cargando/cargando.component';
import { Router } from '@angular/router';
import { extractErrors } from '../../compartidos/funciones/extractErrors';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-editar-genero',
  standalone: true,
  imports: [FormularioGeneroComponent, CargandoComponent, SweetAlert2Module],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css'
})
export class EditarGeneroComponent {
  generosService = inject(GenerosService);
  router = inject(Router);
  @Input({transform: numberAttribute})
  id!: number;
  genero?: GeneroDTO;
  errores: string[] =[];


  ngOnInit() {
    this.generosService.obtenerPorId(this.id).subscribe(genero => {
      this.genero = genero;
    });
  }

  guardarCambios(genero: GeneroCreacionDTO){
    this.generosService.actualizar(this.id, genero).subscribe( {
      next: () => {
        this.router.navigate(['/generos']);
      },
      error: (error) => {
        const errores = extractErrors(error);
        this.errores = errores;
      }
    });
  }

}
