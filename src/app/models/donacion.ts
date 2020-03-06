export class Donacion{
    constructor(
        public _id:string,
        public tipo:string,
        public fundacion:string,
        public sector:string,
        public direccion:string,
        //public calleP:string,
        //public calleS:string,
        public referencia:string,
        public cantidad:string,
        public nombreProducto:string,
        public descripcion:string,
        public donanteR:string,
        public asignar:boolean,
        public estado:string
        
){}
}