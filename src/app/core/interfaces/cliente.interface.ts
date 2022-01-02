export interface Cliente {
    id?          : number;
    rut          : string;
    nombre?      : string;
    telefono?    : string;
    email?       : string;
    ciudad?      : string;
    observacion? : string;
    ok?          : boolean;
    token?       : string;
}