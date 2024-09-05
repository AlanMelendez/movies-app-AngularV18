import { Component, Input, numberAttribute } from '@angular/core';
import { ActorCreacionDTO, ActorDTO } from '../actores';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-actor',
  standalone: true,
  imports: [FormularioActoresComponent, CommonModule],
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.css'
})
export class EditarActorComponent {

  @Input({transform: numberAttribute})
  id!: number;


  actor: ActorDTO = {id: 1, nombre: 'Tom Holland', fechaNacimiento: new Date('1996-01-25'), imagenUrl: 'https://res.cloudinary.com/de5xzoviz/image/upload/v1597688488/setup-desarrollador-web.jpg'};

  guardarCambios(actor: ActorCreacionDTO){
    console.log('Editando cambios actor: ', actor);
  }

}
