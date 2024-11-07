import { Component, inject, Input, numberAttribute } from '@angular/core';
import { ActorCreacionDTO, ActorDTO } from '../actores';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";
import { ActoresService } from '../actores.service';
import { Router } from '@angular/router';
import { extractErrors } from '../../compartidos/funciones/extractErrors';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { EditarEntidadComponent } from "../../compartidos/componentes/editar-entidad/editar-entidad.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';

@Component({
  selector: 'app-editar-actor',
  standalone: true,
  imports: [FormularioActoresComponent, MostrarErroresComponent, EditarEntidadComponent],
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.css',
  providers: [
    {provide: SERVICIO_CRUD_TOKEN, useClass: ActoresService}
  ]
})
export class EditarActorComponent {

  @Input({ transform: numberAttribute })
  id!: number;

  public formulario: Function = FormularioActoresComponent;

  
}
