import { Component, inject, Input, numberAttribute } from '@angular/core';
import { ActorCreacionDTO, ActorDTO } from '../actores';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";
import { ActoresService } from '../actores.service';
import { Router } from '@angular/router';
import { extractErrors } from '../../compartidos/funciones/extractErrors';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-editar-actor',
  standalone: true,
  imports: [FormularioActoresComponent, MostrarErroresComponent],
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.css'
})
export class EditarActorComponent {

  @Input({ transform: numberAttribute })
  id!: number;

  ngOnInit(): void {
    this.actoresService.obtenerPorId(this.id).subscribe(actor => {
      this.actor = actor;
    }, error => console.error(error));

  }

  actor!: ActorDTO;
  actoresService = inject(ActoresService);
  router = inject(Router);
  errores:string[] = [];

  guardarCambios(actor: ActorCreacionDTO) {
    this.actoresService.editar(this.id, actor).subscribe({
      next: () => {
        this.router.navigate(['/actores'])
      },
      error: (error) => {
        const errores = extractErrors(error);
        this.errores = errores;
      }
    });
  }


}
