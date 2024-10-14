import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { FormularioGeneroComponent } from "../formulario-genero/formulario-genero.component";
import { GeneroCreacionDTO } from '../generos';
import { GenerosService } from '../generos.service';
import { extractErrors } from '../../compartidos/funciones/extractErrors';

@Component({
  selector: 'app-crear-generos',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, FormularioGeneroComponent],
  templateUrl: './crear-generos.component.html',
  styleUrl: './crear-generos.component.css'
})
export class CrearGenerosComponent {

  //Services
  private _router = inject(Router);
  private _generosService = inject(GenerosService);

  //Global variables
  public _errores: string[] = [];




  guardarCambios(genero: GeneroCreacionDTO){
    this._generosService.crear(genero).subscribe( {
        next: () => this._router.navigate(['/generos']),
        error: (error) => {
          const errores = extractErrors(error);
          this._errores = errores;
        },
    });

  }

}
