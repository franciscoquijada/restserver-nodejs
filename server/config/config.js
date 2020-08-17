process.env.PORT = process.env.PORT || 3000;

//Entorno 

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Base de datos
let UrlDB;

if(process.env.NODE_ENV === 'dev'){
    UrlDB = 'mongodb://localhost:27017/cafe';
} else{
    UrlDB = 'mongodb+srv://fquijada:cKObkufeIr5tS3Z9@cluster0.xeuhb.mongodb.net/cafe';
}

process.env.URLDB = UrlDB;

