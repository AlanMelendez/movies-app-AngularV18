import { Component, Input, numberAttribute } from '@angular/core';
import { FormularioGeneroComponent } from "../formulario-genero/formulario-genero.component";
import { GeneroCreacionDTO, GeneroDTO } from '../models/generos';

@Component({
  selector: 'app-editar-genero',
  standalone: true,
  imports: [FormularioGeneroComponent],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css'
})
export class EditarGeneroComponent {

  @Input({transform: numberAttribute})
  id!: number;

  //! Genero de prueba para mandarlo al formulario.
  genero: GeneroDTO = {nombre: 'Drama', id: 1};

  guardarCambios(genero: any){
    console.log('DATA DESDE EDITAR GENERO PADRE: ',genero);
    // this.router.navigate(['/generos']);
  }

}
