import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActorCreacionDTO, ActorDTO } from '../actores';
import moment from 'moment';
import { fechaNoPuedeSerFutura } from '../../compartidos/functions/validaciones';
import { CommonModule } from '@angular/common';
import { InputImgComponent } from "../../compartidos/componentes/input-img/input-img.component";

@Component({
  selector: 'app-formulario-actores',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule, InputImgComponent],
  templateUrl: './formulario-actores.component.html',
  styleUrl: './formulario-actores.component.css'
})
export class FormularioActoresComponent {

  ngOnInit(): void {
    if(this.modelo !== undefined){
      this.formularioActores.patchValue(this.modelo);
    }
  }


  private formBuilder =  inject(FormBuilder);

  @Output() posteoFormulario = new EventEmitter<ActorCreacionDTO>();

  @Input() modelo?: ActorDTO;


  formularioActores = this.formBuilder.group({
    nombre: ['',[Validators.required]],
    fechaNacimiento: new FormControl<Date | null>(null, [Validators.required, fechaNoPuedeSerFutura()]),
    imagen : new FormControl<File | string | null>(null)
  });

  guardar(){

    if(!this.formularioActores.valid){
      return;
    }

    const actor = this.formularioActores.value as ActorDTO;

    //Transformamos el objeto MOMENT a fecha.
    actor.fechaNacimiento = moment(actor.fechaNacimiento).toDate();

    this.posteoFormulario.emit(actor);

  }

  cancelar(){
    console.log('cancelar');
  }

  guardarImagen(imagen: File){
    this.formularioActores.get('imagen')?.setValue(imagen);
    console.log(imagen);
  }
}
