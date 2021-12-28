import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-obj-usuarios',
  templateUrl: './obj-usuarios.component.html',
  styleUrls: ['./obj-usuarios.component.css']
})
export class ObjUsuariosComponent implements OnInit {

  titulo: string = '';

  tipoUsuario = [
    {
      id: '3',
      desc: 'Empleado'
    },
    {
      id: '7',
      desc: 'Administrador'
    },
  ];

  miFormulario: FormGroup = this.fb.group({

  });

  constructor( private fb: FormBuilder,
               private _router: Router
    ) { }

  ngOnInit(): void {
    if ( this._router.url.includes('agregar') ) {
      this.titulo = 'AGREGAR';
    }else {
      this.titulo = 'EDITAR';
    }
  }

  guardar(){
    console.log('guardar');
    
  }

  volver(){
    this._router.navigate(['./usuarios']);
  }
}
