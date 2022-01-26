import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObjCategoriasComponent } from './obj-categorias.component';

describe.skip('obj-categoria component', () => {

    let component: ObjCategoriasComponent;
    let fixture: ComponentFixture<ObjCategoriasComponent>;

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                ObjCategoriasComponent
            ],
            providers: [
                FormBuilder,
                Router,
                ActivatedRoute,
                MatSnackBar,
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents();
    });

    beforeEach( () => {
        fixture = TestBed.createComponent(ObjCategoriasComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});