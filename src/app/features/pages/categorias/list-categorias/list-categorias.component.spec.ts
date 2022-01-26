import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListCategoriasComponent } from './list-categorias.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Categoria } from '../../../../core/interfaces/categoria.inteface';
import { ObjCategoriasComponent } from '../obj-categorias/obj-categorias.component';

const displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'actions',
];

let categoriasMock: Categoria [] = [
    { nombre: 'categoria1', descripcion: '' },
    { nombre: 'categoria2', descripcion: '' }
]

let matDialogMock = {
    open  () {
       return {
         afterClose : () => of(true)
       }
    }
};

let mockSnackBar = {
    open () {}
}

describe('list-categoria component', () => {

    let component: ListCategoriasComponent;
    let fixture: ComponentFixture<ListCategoriasComponent>;
    let service: CategoriaService;

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([ { path: 'categorias/editar/:id', component: ObjCategoriasComponent } ])
            ],
            declarations: [
                ListCategoriasComponent
            ],
            providers: [
                { provide: MatDialog, useValue: matDialogMock },
                { provide: MatSnackBar, useValue: mockSnackBar },
                
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    });

    beforeEach( () => {
        fixture = TestBed.createComponent(ListCategoriasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(CategoriaService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('cargarCategorias correcto', () => {
        
        const spy1 = jest.spyOn(service, 'getCategoria').mockImplementation( () => of(categoriasMock) );
        
        component.cargarCategorias();
        service.getCategoria().subscribe(categoria => {
            expect(spy1).toHaveBeenCalledTimes(1);
            expect(categoria).toHaveLength(2);
        });

    }); 
    
    it('editarCategorias correcto', () => {
        const router = TestBed.inject(Router);
        const spyRouter = jest.spyOn( router, 'navigate');
        component.editarCategoria( 1 );
        expect(spyRouter).toHaveBeenCalledTimes(1);
    }); 

    it('eliminarCategorias correcto', () => {
        
        //const spy1 = jest.spyOn(service, 'borrarCategoria').mockImplementation( );
        const catEliminar = 1;
        const catEliminarstring = 'eliminar';
        
        component.eliminarCategoria( catEliminar,  catEliminarstring );

        //expect(spy1).toBeCalledTimes(1);
    }); 

    it('mostrarSnackbar correcto', () => {
        const mensaje = 'Correcto';
        component.mostrarSnackbar(mensaje);
    });
});