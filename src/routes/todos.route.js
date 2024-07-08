const {Router} = require('express');
const router = Router();
const {create, edit, remove} = require('../controllers/todos.controller');

router.post('/api/todos/create', create);
router.post('/api/todos/edit/:name', edit);
router.get('/api/todos/remove/:name', remove);

module.exports = router;