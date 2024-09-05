import { Component } from '@angular/core';
import { CineCreacionDTO, CineDTO } from '../cines';
import { FormularioCinesComponent } from '../formulario-cines/formulario-cines.component';

@Component({
  selector: 'app-crear-cine',
  standalone: true,
  imports: [FormularioCinesComponent],
  templateUrl: './crear-cine.component.html',
  styleUrl: './crear-cine.component.css'
})
export class CrearCineComponent {

  constructor() { }


  guardarCambios(cine: CineCreacionDTO){
    console.log('CREANDO CINE DESDE CREAR CINE COMPONENT',cine);
  }

}
