import { Component, Input, numberAttribute } from '@angular/core';
import { CineDTO, CineCreacionDTO } from '../cines';
import { FormularioCinesComponent } from '../formulario-cines/formulario-cines.component';

@Component({
  selector: 'app-editar-cine',
  standalone: true,
  imports: [FormularioCinesComponent],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.css'
})
export class EditarCineComponent {
  @Input({transform: numberAttribute})
  id!: number;
  modelo: CineDTO = {id:2,nombre: 'Cine de pruebastl', latitud: 25.56015623318493, longitud: -103.52843291947134};
//25.56015623318493, -103.52843291947134
  guardarCambios(cine: CineCreacionDTO){
    console.log('CREANDO CINE DESDE EDITAR CINE COMPONENT',cine);
  }
}
