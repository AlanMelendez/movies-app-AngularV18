import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CineCreacionDTO } from '../cines';
import { MapaComponent } from '../../compartidos/componentes/mapa/mapa.component';
import { Coordenada } from '../../compartidos/componentes/mapa/coordenada';

@Component({
  selector: 'app-formulario-cines',
  standalone: true,
  imports: [MatFormFieldModule,ReactiveFormsModule,MatInputModule,MatButtonModule,RouterLink, MapaComponent],
  templateUrl: './formulario-cines.component.html',
  styleUrl: './formulario-cines.component.css'
})
export class FormularioCinesComponent implements OnInit{

  ngOnInit(){
    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
      this.coordenadasIniciales.push({latitud: this.modelo.latitud, longitud: this.modelo.longitud});
    }
  }

  @Input() modelo?: CineCreacionDTO;
  @Output() posteoFormulario = new EventEmitter<CineCreacionDTO>();

  coordenadasIniciales: Coordenada[] = [];

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    nombre: ['',[Validators.required]],
    latitud: new FormControl<number | null>(null, [Validators.required]),
    longitud: new FormControl<number | null>(null, [Validators.required]),
  });

  guardarCambios(){
    if(this.form.invalid){
      return;
    }
    const cine = this.form.value as CineCreacionDTO;
    this.posteoFormulario.emit(cine);
  }

guardarCoordenadas(coordenada: Coordenada){

  this.form.patchValue(coordenada);

}

}
