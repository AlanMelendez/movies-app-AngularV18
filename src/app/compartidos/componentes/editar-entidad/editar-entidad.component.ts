import { Component, ComponentRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { CargandoComponent } from "../cargando/cargando.component";
import { MostrarErroresComponent } from "../mostrar-errores/mostrar-errores.component";
import { Router } from '@angular/router';
import { IServicioCRUD } from '../../interfaces/IServicioCRUD';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/proveedores';
import { extractErrors } from '../../funciones/extractErrors';

@Component({
  selector: 'app-editar-entidad',
  standalone: true,
  imports: [CargandoComponent, MostrarErroresComponent],
  templateUrl: './editar-entidad.component.html',
  styleUrl: './editar-entidad.component.css'
})
export class EditarEntidadComponent<Generico, GenericoCreacionDTO> {
  cargando:boolean=false;

  @Input({required:true}) titulo:string;
  @Input({required:true}) rutaIndice!:string;
  @Input({required:true}) formulario!:any;
  @Input({required:true}) id:number;


  // DI -> All components.
  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as IServicioCRUD<Generico,GenericoCreacionDTO>;
  private router = inject(Router);

  //Referencia a componentes:
  @ViewChild('contenedorFormulario', {read: ViewContainerRef}) contenedorFormulario!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;

  errores:string[] = [];

  ngOnInit(): void {
    this.servicioCRUD.obtenerPorId(this.id).subscribe(
      (entidad:any)=>{
        this.cargarFormulario(entidad)
      }
    )
  }

  ngAfterViewInit(): void {

  

  }

  cargarFormulario(entidad:any){
    this.componentRef= this.contenedorFormulario.createComponent(this.formulario);
    this.componentRef.instance.modelo=entidad
    this.componentRef.instance.posteoFormulario.subscribe((entity:any)=>{
     this.guardarCambiosEvent(entity)
    })
  }

  guardarCambiosEvent(entidad:GenericoCreacionDTO){
    this.servicioCRUD.editar(this.id, entidad).subscribe({
      next: () => {
        this.router.navigate(['/actores'])
      },
      error: (error) => {
        const errores = extractErrors(error);
        this.errores = errores;
      }
    });
  }
}
