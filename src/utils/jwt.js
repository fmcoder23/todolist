const config = require('../../config');
const { sign, verify } = require('jsonwebtoken');

const createToken = (payload) => sign(payload, config.jwtSecretKey, { expiresIn: config.jwtExpiration });

const checkToken = (payload, callback) => verify(payload, config.jwtSecretKey, callback);

module.exports = {
    createToken,
    checkToken,
}