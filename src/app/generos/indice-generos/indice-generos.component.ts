import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GenerosService } from '../generos.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-indice-generos',
  standalone: true,
  imports: [RouterLink, MatButtonModule ],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.css'
})
export class IndiceGenerosComponent {

  generosService = inject(GenerosService)

  /**
   *
   */
  constructor() {
    const generos = this.generosService.getAll();
    console.log(generos);

  }

}
