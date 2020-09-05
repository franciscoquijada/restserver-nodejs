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

process.env.FECHA_VENCIMIENTO_TOKEN = '24h';

//Seed para autenticacion

process.env.SEED = process.env.SEED || 'mi-secret-token';

