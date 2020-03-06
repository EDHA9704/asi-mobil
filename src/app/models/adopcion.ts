export class Adopcion{
    constructor(   
        public _id:string,
        public fundacion:string,
        public adoptante:string,
        public mascota:string,
        /*--DATOS PARA ADOPCION--*/
        //public nombres:string,//*********ya no va
        //public apellidos:string,//*******ya no va */
        public cedula:string,
       
        public ocupacion:string,
        public edad:string,
        public instruccion:any,
        public direccion:string,
        //ok

            //referencias personales
        public nombresRP:string,
        //public parentescoRP:*****YA NO VA string,
        public telefonoRP:string,
            //situacion familiar
        public numPersonas:string,
        public familiarEmbarazo:string,
        public familiarAlergico:string,
            //domicilio
        public inmueble:string,
        //public mudarse:string,//¿PLANEA MUDARSE PROXIMAMENTE? /// ******************************YA NO VA
        public cerramiento:string, //EL LUGAR DONDE PASARÁ EL CANINO, ¿TIENE CERRAMIENTO?
            //relacion con los animales
        //public tieneMascotas:string, // **************************************** YA NO VA
        public numMascotas:string,//ha tenido o tiene mascotas? cuantas.
        public estadoMascotas:string,//en que estado se encuentran las mascotas?
            //preguntas 
        public deseoAdoptar:string, // porque desea adoptar una mascota
        public cambiarDomicilio:string, // SI POR ALGÚN MOTIVO TUVIERA QUE CAMBIAR DE DOMICILIO, ¿QUÉ PASARÍA CON SU MASCOTA?
       // public dueniosNCasa:string, ******* YA NO VAAA //CON RELACIÓN A LA ANTERIOR PRGUNTA ¿QUÉ PASARIA SI LOS DUEÑOS DE LA NUEVA CASA NO ACEPTACEN MASCOTAS?
        public salirViaje:string,//SI UD. DEBE SALIR DE VIAJE MÁS DE UN DÍA, LA MASCOTA:
        public tiempoSolo:string,//¿CUÁNTO TIEMPO EN EL DÍA PASARÁ SOLA LA MASCOTA?
        public dormirMS:string, //¿DÓNDE DORMIRÁ LA MASCOTA?
        //public necesidadesMS:string, *****************YA NO VA //¿DÓNDE HARÁ SUS NECESIDADES?
        public comidaMS:any, //¿QUE COMERÁ HABITUALMENTE LA MASCOTA?
        public enfermaMS:string,//SI SU MASCOTA ENFERMA USTED:
        public cargoGastos:string, //¿QUIÉN SERÁ EL RESPONSABLE Y SE HARÁ CARGO DE CUBRIR LOS GASTOS DE LA MASCOTA?
        public dineroMensualMS:string,//ESTIME CUÁNTO DINERO PODRÍA GASTAR EN SU MASCOTA MENSUALMENTE
        //public recursos:string, ******** YA NO VA//¿CUENTA CON LOS RECURSOS PARA CUBRIR LOS GASTOS VETERINARIOS DEL ANIMAL DE COMPAÑÍA?
        public visitarDomicilio:string,//¿ESTA DE ACUERDO EN QUE SE HAGA UNA VISITA PERIÓDICA A SU DOMICILIO PARA VER COMO SE ENCUENTRA EL ADOPTADO?
        //public esterilizadaMS:string ****** YA NO VA,//¿ESTÁ DE ACUERDO EN QUE LA MASCOTA SEA ESTERILIZADA? (OPERADA PARA NO TENER MAS CACHORROS)
        //public beneficiosEsterilizacion:string, ***** YA NO VA//¿CONOCE USTED LOS BENEFICIOS DE LA ESTERILIZACIÓN?
        //public tenenciaResponsable:string, ****YA NO VA//SEGÚN USTED, ¿QUÉ ES TENENCIA RESPONSABLE?
        //public ordenanzaTenencia:string, ***** YA NO VA//¿ESTÁ UD. INFORMADO Y CONCIENTE SOBRE LA ORDENANZA MUNICIPAL SOBRE LA TENENCIA REPONSABLE DE MASCOTAS?
        public compartidaFamilia:string, //¿LA ADOPCIÓN FUE COMPARTIDA CON su FAMILIA?
        //public acuerdoFamilia:string, *** COMPARTIDA CON LA FAMILIA//SU FAMILIA ESTÁ:
        
        //observaciones de la fundaciones
        public observaciones:string,
        public fechaRespuesta:string,
        public creadoEn:string,
        public aprobado:string
){}
}