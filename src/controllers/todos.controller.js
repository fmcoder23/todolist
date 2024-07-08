const Io = require('../utils/io');
const Todo = require('../models/todo.model');

const todosDB = new Io(`${process.cwd()}/database/todos.json`);

const create = async (req, res) => {
    try {
        const { name } = req.body;
        let todos = await todosDB.read();
        let userID = req.user.id;
        const findTodo = todos.find(el => el.name == name && el.userID == userID);
        if (findTodo) {
            return res.status(400).json({ message: "Todo already exists" });
        }
        const todo = new Todo(name, userID);
        todos.push(todo);
        await todosDB.write(todos);
        todos = todos.filter(el => el.userID == userID);
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
}

const edit = async (req, res) => {
    try {
        const oldName = req.params.name;
        const { name } = req.body;

        const todos = await todosDB.read();

        const findTodo = todos.find(el => el.name == oldName);
        findTodo.name = name
        await todosDB.write(todos);
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const remove = async (req, res) => {
    try {
        const { name } = req.params;
        let todos = await todosDB.read();
        todos = todos.filter(el => el.name != name);
        await todosDB.write(todos);
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    remove,
    edit,
    create,
}