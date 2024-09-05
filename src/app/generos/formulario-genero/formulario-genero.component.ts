import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from '../../compartidos/functions/validaciones';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { GeneroCreacionDTO, GeneroDTO } from '../models/generos';

@Component({
  selector: 'app-formulario-genero',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, RouterLink],
  templateUrl: './formulario-genero.component.html',
  styleUrl: './formulario-genero.component.css'
})
export class FormularioGeneroComponent implements OnInit {

  //! Mandamos la información del formulario al componente padre. (Esto es para crear).
  @Output() posteoDatosFormulario = new EventEmitter<GeneroCreacionDTO>();

  //! Recibimos la información del componente padre (Esto es para editar).
  @Input() modelo?: GeneroDTO;


   ngOnInit(){
    if(this.modelo !== undefined){
      //!Si el modelo tiene información, la cargamos en el formulario. (Quiere decir que vamos a editar).
      this.formGroupLocal.patchValue(this.modelo);
    }
  }


  private formBuilder =  inject(FormBuilder);

  guardarCambios(){

    console.log('Guardando...',this.formGroupLocal.value);

    if(this.formGroupLocal.invalid){
      return;
    }

    //!Parseamos el valor del formulario a un objeto de tipo GeneroCreacionDTO.
    const genero = this.formGroupLocal.value as GeneroCreacionDTO;

    //!Mandamos la información al componente padre.
    this.posteoDatosFormulario.emit(genero);
  }

  //Creamos nuestro grupo de controles (inputs) del formulario.
  formGroupLocal= this.formBuilder.group({
    nombre: ['', [Validators.required, primeraLetraMayuscula()]],
  })

}
