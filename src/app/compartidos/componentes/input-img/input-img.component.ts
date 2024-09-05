import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { toBase64 } from '../../functions/toBase64';

@Component({
  selector: 'app-input-img',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css',
})
export class InputImgComponent {

  @Input({ required: true }) titulo!: string;
  @Input() urlImagenActual?: string;
  @Output() archivoSeleccionado = new EventEmitter<File>();



  imagenBase64!: string;

  cambio($event: Event) {
    const inputArchivo = $event.target as HTMLInputElement;

    if (inputArchivo.files && inputArchivo.files.length) {
      const archivo = inputArchivo.files[0];
      toBase64(archivo).then(
        (data:string)=>{
          this.imagenBase64 = data;
          this.archivoSeleccionado.emit(archivo);
        }
      ).catch(
        (err:string)=>{
          console.error('Se obtuvo el siguiente error, al intentar abrir el archivo: ',err);
        }
      )
    }

    //Si se carga una imagen nueva al editar, se elimina la imagen anterior.
    this.urlImagenActual = undefined;
  }
}
