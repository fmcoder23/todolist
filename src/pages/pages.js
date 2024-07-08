const Io = require('../utils/io');
const todoDB = new Io(`${process.cwd()}/database/todos.json`);

const homePage = async (req, res) => {
    const todos = await todoDB.read();
    res.render('index', {todos, req});
}

const registerPage = (req, res) => {
    res.render('register');
}

const loginPage = (req, res) => {
    res.render('login');
}

const loginSuccessPage = (req, res) => {
    res.render('login-success');
}

const loginFailedPage = (req, res) => {
    res.render('login-failed');
}

module.exports = {
    homePage,
    registerPage,
    loginPage,
    loginSuccessPage,
    loginFailedPage,
}