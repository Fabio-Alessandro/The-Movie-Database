const jsonWebToken = require ("jsonwebtoken");

const SECRET = "A1Z9";

const generateToken = payload => jsonWebToken.sign (payload, SECRET, { expiresIn: "2h" });
const validateToken = token => jsonWebToken.verify (token, SECRET);

module.exports = { generateToken, validateToken }