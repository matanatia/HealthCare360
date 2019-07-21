const express = require('express');
const jsonHeandler = require('../models/json-heandler');
const valid = require('../models/input-validation');
const router = express.Router();

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
        if (!jsonDB[email] || jsonDB[email].password !== password) {
            return res.status(401).send({ message: `Email address or password is incorrect` });
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

        const new_user = {
            email,
            full_name,
            password
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
