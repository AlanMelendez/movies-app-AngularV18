import { Component, ComponentRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/proveedores';
import { IServicioCRUD } from '../../interfaces/IServicioCRUD';
import { Router } from '@angular/router';
import { extractErrors } from '../../funciones/extractErrors';
import { MostrarErroresComponent } from "../mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-crear-entidad',
  standalone: true,
  imports: [MostrarErroresComponent],
  templateUrl: './crear-entidad.component.html',
  styleUrl: './crear-entidad.component.css'
})
export class CrearEntidadComponent<Generico, GenericoCreacionDTO>{

  ngAfterViewInit(): void {
    this.componentRef = this.contenedorFormulario.createComponent(this.formulario);

    //Subscribe to event to Post Formulario
    this.componentRef.instance.posteoFormulario.subscribe(
      (entidad:any)=>{
        this.guardarCambios(entidad);
      }
    )
  }

  @Input({required:true}) titulo!:string;
  @Input({required:true}) rutaIndice!:string;
  @Input({required:true}) formulario!:any;

  errores:string[]=[];

  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as IServicioCRUD<Generico,GenericoCreacionDTO>;
  private router = inject(Router);

  @ViewChild('contenedorFormulario', {read: ViewContainerRef}) contenedorFormulario!: ViewContainerRef;

  private componentRef!: ComponentRef<any>;

  guardarCambios(entidad: GenericoCreacionDTO){
    this.servicioCRUD.crear(entidad)
      .subscribe({
        next: (value) => { 
          this.router.navigate([this.rutaIndice])
        },
        error: (err)=> {
          const errores= extractErrors(err);
          this.errores=errores;
        },
      })
  }

}
