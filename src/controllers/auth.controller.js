const bcrypt = require('bcrypt');

const Io = require('../utils/io');
const User = require('../models/user.model');
const { createToken } = require('../utils/jwt');

const usersDB = new Io(`${process.cwd()}/database/users.json`);


const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const users = await usersDB.read();
        const findUser = users.find((el) => el.username == username);

        if (!findUser) {
            return res.redirect("/api/auth/login-failed");
        }

        const checkPassword = await bcrypt.compare(password, findUser.password);

        if (!checkPassword) {
            return res.redirect("/api/auth/login-failed");
        }

        const token = createToken({ id: findUser.id });
        res.cookie("token", token, {maxAge: 1000 * 60 * 60});

        res.redirect('/');


    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
    try {
        const { fullname, username, password } = req.body;

        const users = await usersDB.read();
        const findUser = users.find((el) => el.username == username);

        if (findUser) {
            return res.redirect("/api/auth/login-failed");
        }

        const newUser = new User(fullname, username, password);
        users.push(newUser);
        await usersDB.write(users);
        const token = createToken({ id: newUser.id });
        res.cookie("token", token, {maxAge: 1000 * 60 * 60});
        return res.redirect("/api/auth/login-success");

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}

module.exports = {
    login,
    register,
    logout
}