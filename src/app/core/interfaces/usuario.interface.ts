import { Rol } from './tipoRol.inteface';
export interface Usuario {
    id             : number;
    identificacion : string;
    nombres        : string;
    apellidos      : string;
    telefono       : string;
    email          : string;
    password       : string;
    direccion      : string;
    fotoUrl?       : string;
    rol            : Rol;
    ok?            : boolean;
}