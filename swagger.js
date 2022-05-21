const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'To Do List API',
    description:
      'API for a To Do List Project for cse341 course developed by José Aguirre',
  },
  host: 'cse341-todo-jofravimusic.herokuapp.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpoint = ['./routes/index.js'];

swaggerAutogen(outputFile, endpoint, doc);
