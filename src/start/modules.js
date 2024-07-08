const cookie = require('cookie-parser');
const isAuth = require('../middlewares/is-auth.middleware');

const { homePage, registerPage, loginPage, loginSuccessPage, loginFailedPage } = require('../pages/pages');

const authRoute = require('../routes/auth.route');
const todosRoute = require('../routes/todos.route');

const modules = (app, express) => {
    app.use(cookie());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.set("view engine", "ejs");
    app.use(express.static(`${process.cwd()}/src/controllers`));

    app.get('/', isAuth, homePage);
    app.get('/register', registerPage);
    app.get('/login', loginPage);
    app.get('/api/auth/logout', registerPage);
    app.post('/api/create', authRoute);
    app.post('/api/auth/register', authRoute);
    app.post('/api/auth/login', authRoute);
    app.get('/api/auth/register', registerPage);
    app.get('/api/auth/login-success', loginSuccessPage);
    app.get('/api/auth/login-failed', loginFailedPage);
    app.post('/api/todos/create', isAuth, todosRoute);
    app.get('/api/todos/remove/:name', isAuth, todosRoute);
    app.post('/api/todos/edit/:name', isAuth, todosRoute);

}

module.exports = modules;