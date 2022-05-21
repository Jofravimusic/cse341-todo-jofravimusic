// Enviroment variables config
const dotenv = require('dotenv');

dotenv.config();
const url = process.env.DBurl;
// Database Variables
const { MongoClient } = require('mongodb');

const client = new MongoClient(url);

// eslint-disable-next-line no-underscore-dangle
let _toDoList;

async function connectDatabase() {
  await client.connect((err, database) => {
    if (err) throw err;
    _toDoList = database.db('todolist');
    console.log('Database Connected Sucsesfully');
  });
}

function getTasks() {
  return _toDoList.collection('tasks');
}

function getUsers() {
  return _toDoList.collection('users');
}

module.exports = { connectDatabase, getTasks, getUsers };
