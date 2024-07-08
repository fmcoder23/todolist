const { checkToken } = require('../utils/jwt');

const isAuth = (req, res, next) => {
    if (!req.cookies.token) {
        return res.redirect('/register');
    }

    checkToken(req.cookies.token, (err, data) => {
        if (err) return res.redirect('/login');
        req.user = data;
        next();

    });

}

module.exports = isAuth;