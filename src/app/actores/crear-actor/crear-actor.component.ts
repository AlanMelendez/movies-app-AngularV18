import { Component, inject } from '@angular/core';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";
import { ActorCreacionDTO } from '../actores';
import { ActoresService } from '../actores.service';
import { Router } from '@angular/router';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-crear-actor',
  standalone: true,
  imports: [FormularioActoresComponent, MostrarErroresComponent],
  templateUrl: './crear-actor.component.html',
  styleUrl: './crear-actor.component.css'
})
export class CrearActorComponent {
  private _actoresService =  inject(ActoresService);
  router = inject(Router);
  errores: string[] = [];

  guardarCambios(actor: ActorCreacionDTO){
    this._actoresService.crear(actor).subscribe(
      {
        next: actorCreado => {
          this.router.navigate(['/actores']);
        },
        error: (error) => this.errores = error.error
      }
    );
  }
}
