const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const jsonHeandler = require('../models/json-heandler');
const valid = require('../models/input-validation');

//use - api/auth/login   body - email, password
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    //validate inputs
    if (!valid.required([email, password])) {
        return res.status(400).send({ message: `Email or password are missing` });
    }

    if (!valid.email(email)) {
        return res.status(400).send({ message: `Email address format is invalid` });
    }

    //check login with db
    try {
        const jsonDB = await jsonHeandler.getJson();

        //if user not exsit in db or the password is incorrect
        const validPass = await bcrypt.compare(password, jsonDB[email].password);

        if (!jsonDB[email] || !validPass) {
            return res.status(400).send({ message: `Email address or password is incorrect` });
        }

        res.send({ auth: true });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Problem with the server DB connection" });
    }
});

//use - api/auth/login   body - full_name ,email, password
router.post('/register', async (req, res) => {

    const { full_name, email, password } = req.body;

    //validate inputs
    if (!valid.required([email, password, full_name])) {
        return res.status(400).send({ message: `Email, password or full name are missing` });
    }

    if (!valid.email(email)) {
        return res.status(400).send({ message: `Email address format is invalid` });
    }

    //check registration with db
    try {
        const jsonDB = await jsonHeandler.getJson();

        //if user already exsit in db
        if (jsonDB[email]) {
            return res.status(400).send({ message: `User already exist` });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const new_user = {
            email,
            full_name,
            password: hashPassword
        }

        jsonDB[new_user.email] = new_user;
        await jsonHeandler.upJson(jsonDB);

        res.send({ auth: true });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Problem with the server DB connection" });
    }
});

module.exports = router;
