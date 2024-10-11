import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GenerosService } from '../generos.service';
import { MatButtonModule } from '@angular/material/button';
import { GeneroDTO } from '../generos';

@Component({
  selector: 'app-indice-generos',
  standalone: true,
  imports: [RouterLink, MatButtonModule ],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.css'
})
export class IndiceGenerosComponent {

  generosService = inject(GenerosService)
  generos: GeneroDTO[] = [];

  /**
   *
   */
  constructor() {
    this.generosService.obtenerTodos().subscribe(generos => {
      this.generos = generos;
      console.log(generos);
    });
  }

}
