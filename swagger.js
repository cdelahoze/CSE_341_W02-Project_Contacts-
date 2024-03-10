const swaggerAutogen = require('swagger-autogen')();

const doc = { 
    info: {
        title: 'Users Api', 
        description: 'Users Api'
    },
    host: 'localhost:8080', 
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/controllers/user.js'];

// this will generate swagger.json 

swaggerAutogen(outputFile, endpointsFiles, doc);