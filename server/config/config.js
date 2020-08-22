process.env.PORT = process.env.PORT || 3000;

//Entorno 

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Base de datos
let UrlDB;

if(process.env.NODE_ENV === 'dev'){
    UrlDB = 'mongodb://localhost:27017/cafe';
} else{
    UrlDB = process.env.MONGO_URL;
}

process.env.URLDB = UrlDB;

//Fecha de vencimiento del token
//60 segundos
//60 minutos
//24 horas
//30 dias

process.env.FECHA_VENCIMIENTO_TOKEN = 60 * 60 * 24 * 30;

//Seed para autenticacion

process.env.SEED = process.env.SEED || 'mi-secret-token';

