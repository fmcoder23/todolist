const bcrypt = require('bcrypt');
const {v4:uuid} = require('uuid');

class User {
    constructor(fullname, username, password) {
        this.id = uuid();
        this.fullname = fullname;
        this.username = username;
        this.password = bcrypt.hashSync(password, 12);
    }
}

module.exports = User;