const express = require ("express");
const User = require ("../models/User");
const { generateToken } = require ("../utils/tokens");
const { validateUser } = require("../config/middleware/validateUser");

const router = express.Router ();

router.get ("/me", validateUser, (req, res) => {
        
    res.send (req.user);
});

router.post ("/register", (req, res) => {

    User.create (req.body)

        .then (() => res.sendStatus (201))
        .catch (console.error);
});

router.post ("/login", (req, res) => {

    let user;
    const { email, password } = req.body

    User.findOne ({ where: { email }})

        .then (instance => {

            user = instance;
            
            if (!user) return res.sendStatus (401);

            return user.authenticate (password);
        })
        .then (valid => {

            if (!valid) return res.sendStatus (401);

            const { email, name, lastName } = user.dataValues;
            const payload = { email, name, lastName }
            const token = generateToken (payload);

            res.cookie ("token", token).send (payload);
        })
        .catch (console.error);
});

router.post ("/logout", (req, res) => {

	res.clearCookie ("token").sendStatus (204);
});	

module.exports = router;