import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnInit,
  OnChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { InputImgComponent } from '../../compartidos/componentes/input-img/input-img.component';
import { PeliculaDTO, PeliculaCreacionDTO } from '../peliculas';
import moment from 'moment';

@Component({
  selector: 'app-formulario-peliculas',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatDatepickerModule,
    InputImgComponent,
  ],
  templateUrl: './formulario-peliculas.component.html',
  styleUrl: './formulario-peliculas.component.css',
})
export class FormularioPeliculasComponent implements OnInit, OnChanges {
  constructor() {}

  ngOnInit(): void {
    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  ngOnChanges(): void {
    // this.ngOnInit();
  }
  @Input() modelo?: PeliculaDTO;

  @Output() posteoFormulario = new EventEmitter<PeliculaCreacionDTO>();

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    titulo: ['', [Validators.required]],
    fechaLanzamiento: new FormControl<Date | null>(null, [Validators.required]),
    trailer: '',
    poster: new FormControl<File | string | null>(null),
  });

  archivoSeleccionado(file: File) {
    this.form.get('poster')?.setValue(file);
  }

  guardarCambios() {
    if (this.form.invalid) {
      return;
    }

    const pelicula = this.form.value as PeliculaCreacionDTO;

    pelicula.fechaLanzamiento = moment(pelicula.fechaLanzamiento).toDate();

    this.posteoFormulario.emit(pelicula);
  }

  obtenerErrorCampoTitulo() {
    let campo = this.form.get('titulo');

    if (campo?.hasError('required')) {
      return 'El campo es requerido';
    }

    return '';
  }

  obtenerErrorCampoFechaLanzamiento() {
    let campo = this.form.get('fechaLanzamiento');

    if (campo?.hasError('required')) {
      return 'El campo es requerido';
    }

    return '';
  }
}
