const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send(`Welcome to this To Do List API. Use this routes: /todo and /users. More information in /api-docs
  `);
});
routes.use('/todo', require('./toDoList'));
routes.use('/users', require('./users'));
routes.use('/api-docs', require('./doc'));

module.exports = routes;
