export interface Proveedor {
    id       : number;
    nit      : string;
    nombre   : string;
    direccion: string;
    telefono : string;
    email    : string;
    ok?      : boolean;
}