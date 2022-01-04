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
    rolId          : number;
    ok?            : boolean;
}