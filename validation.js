const { check, validationResult } = require('express-validator');

exports.taskValidation = [
  check('completed', 'Completed status is requied (default "false")')
    .not()
    .isEmpty(),
  check('createdBy', 'Created by is required').not().isEmpty(),
  check('dueDate', 'Due date is required').not().isEmpty(),
  check('sharedWith', 'Shared with is required').not().isEmpty(),
  check('taskName', 'Please, provide a Task Name').not().isEmpty(),
];

exports.userValidation = [
  check('firstName', 'First Name is required').not().isEmpty(),
  check('lastName', 'Last Name is required').not().isEmpty(),
  check('email', 'Please include a valid email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check('role', 'Role is required').not().isEmpty(),
  check('password', 'Password is required').not().isEmpty(),
];

exports.results = validationResult;
