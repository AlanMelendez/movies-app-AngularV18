export interface ActorDTO {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  imagenUrl?: string;
}

export interface ActorCreacionDTO {
  nombre: string;
  fechaNacimiento: Date;
  imagen?: File ;
}
