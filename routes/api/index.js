const router = require('express').Router();
const {
  USERS,
  USER,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  ADD_FRIEND,
  DELETE_FRIEND,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(USERS).post(ADD_USER);

// /api/users/:userId
router.route('/:userId').get(USER).put(EDIT_USER).delete(DELETE_USER);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(ADD_FRIEND).delete(DELETE_FRIEND);

module.exports = router;


