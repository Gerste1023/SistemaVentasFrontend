

export interface Auth {
    id?            : number;
    identificacion : string;
    nombres?       : string;
    apellidos?     : string;
    img?           : string;
    tipo?          : number;
    ok?            : boolean;
    token?         : string;
}