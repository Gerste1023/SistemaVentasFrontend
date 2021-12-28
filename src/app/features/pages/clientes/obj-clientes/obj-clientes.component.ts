import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-obj-clientes',
  templateUrl: './obj-clientes.component.html',
  styleUrls: ['./obj-clientes.component.css']
})
export class ObjClientesComponent implements OnInit {

  titulo: string = '';
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
    this._router.navigate(['./clientes']);
  }

}
