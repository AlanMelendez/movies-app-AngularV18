import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { LeafletModule } from '@bluehalo/ngx-leaflet';
import {
  tileLayer,
  latLng,
  LeafletMouseEvent,
  Marker,
  icon,
  MarkerOptions,
  marker,
} from 'leaflet';
import { Coordenada } from './coordenada';
@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
})
export class MapaComponent implements OnInit {
  ngOnInit():void {
    this.capas=[];
    this.capas = this.coordenadaInicial.map(
      valor => {
        const marcador =  marker([valor.latitud, valor.longitud], this.markerOptions);

        return marcador;
      }
    );
  }

  @Input() coordenadaInicial: Coordenada[] = [];
  @Output() coordenadaSeleccionada = new EventEmitter<Coordenada>();

  markerOptions: MarkerOptions = {
    icon: icon({
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [13, 41],
    }),
  };

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 38,
        attribution: '...',
      }),
    ],
    zoom: 15,
    // center: latLng(46.879966, -121.726909),

    //Colocamos el centro en la latitud y longitud de la ciudad de Lerdo Durango
    center: latLng(25.56015623318493, -103.52843291947134),
  };

  capas: Marker<any>[] = [];

  manejarClick(event: LeafletMouseEvent) {
    let latitud = event.latlng.lat;
    let longitud = event.latlng.lng;
    this.capas = [];

    this.capas.push(marker([latitud, longitud], this.markerOptions));
    this.coordenadaSeleccionada.emit({ latitud: latitud, longitud: longitud });
  }
}
