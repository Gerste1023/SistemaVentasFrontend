import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-obj-categorias',
  templateUrl: './obj-categorias.component.html',
  styleUrls: ['./obj-categorias.component.css']
})
export class ObjCategoriasComponent implements OnInit {

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
    this._router.navigate(['./categorias']);
  }

}
