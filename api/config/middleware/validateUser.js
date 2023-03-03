const { validateToken } = require ("../../utils/tokens");

const validateUser = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) return res.sendStatus (401);

    const { name, lastName, email } = validateToken (token);
    const payload = { name, lastName, email }
  
    if (!Object.keys (payload).length) return res.sendStatus (401);

    req.user = payload;

    next ();
}

module.exports = { validateUser }