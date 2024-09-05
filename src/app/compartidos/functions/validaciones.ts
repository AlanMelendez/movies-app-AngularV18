import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export function primeraLetraMayuscula(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const valor = <string>control.value;

    if (!valor) return null;

    if(valor.length === 0) return null;

    const primeraLetra = valor[0];

    if(primeraLetra !== primeraLetra.toUpperCase()){
      return {primeraLetraMayuscula: {mensaje: 'La primera letra debe ser mayúscula bb'}};
    }

    return null;


  }
}

export function fechaNoPuedeSerFutura(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const dateSelectedUser = <Date>control.value;

    if (!dateSelectedUser) return null;

    const hoy = new Date();

    if(dateSelectedUser > hoy){
      return {fechaNoPuedeSerFutura: {mensaje: 'La fecha no puede ser futura'}};
    }

    return null;
  }
}
