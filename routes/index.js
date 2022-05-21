const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Welcome to this To Do List API');
});
routes.use('/todo', require('./toDoList'));
routes.use('/api-docs', require('./doc'));

module.exports = routes;
