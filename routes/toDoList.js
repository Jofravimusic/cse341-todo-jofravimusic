const routes = require('express').Router();
const { ObjectId } = require('mongodb');

const dbconnection = require('../model/dbconnection');

routes.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://cse341-contacts-frontend.netlify.app'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

// Get all tasks
routes.get('/', (req, res) => {
  const task = dbconnection.getTasks().find();

  task.toArray().then((documents) => {
    res.status(200).json(documents);
    console.log('All tasks shown');
  });
});

// Create a task
routes.post('/', (req, res) => {
  const task = dbconnection.getTasks().insertOne({
    completed: req.body.completed,
    createdBy: req.body.createdBy,
    dueDate: req.body.dueDate,
    sharedWith: req.body.sharedWith,
    taskName: req.body.taskName,
  });

  task.then((document) => {
    if (!document.insertedId) return res.status(404).send(`No task was added`);
    res.status(201).redirect(`/todo/${document.insertedId}`);
    console.log(`Task was created with id: ${document.insertedId}`);
  });
});

// Get a task by Id
routes.get('/:id', (req, res) => {
  const taskId = new ObjectId(req.params.id);
  const task = dbconnection.getTasks().findOne({ _id: taskId });

  task.then((document) => {
    if (!document)
      return res.status(404).send(`No task with id: ${req.params.id}`);
    res.status(200).json(document);
    console.log(`task was retrieved with id: ${req.params.id}`);
  });
});

// Update a Contact by Id
routes.put('/:id', (req, res) => {
  const taskId = new ObjectId(req.params.id);
  const task = dbconnection.getTasks().updateOne(
    {
      _id: taskId,
    },
    {
      $set: {
        completed: req.body.completed,
        createdBy: req.body.createdBy,
        dueDate: req.body.dueDate,
        sharedWith: req.body.sharedWith,
        taskName: req.body.taskName,
      },
    }
  );

  task.then((document) => {
    if (document.matchedCount >= 1) {
      if (document.modifiedCount < 1)
        return res
          .status(404)
          .send('Task could not be updated, nothing was changed');
      res.status(201).json(document);
      console.log(`Task was updated with id: ${req.params.id}`);
    } else {
      res.status(404).send(`task was not found with id: ${req.params.id}`);
    }
  });
});

// Delete a Contact by Id
routes.delete('/:id', (req, res) => {
  const taskId = new ObjectId(req.params.id);
  const task = dbconnection.getTasks().deleteOne({ _id: taskId });

  task.then((document) => {
    if (document.deletedCount < 1)
      return res
        .status(404)
        .send(`No task with id: ${req.params.id} or deleted was not processed`);
    res.status(200).json(document);
    console.log(`task was deleted with id: ${req.params.id}`);
  });
});

module.exports = routes;
