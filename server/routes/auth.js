const express = require('express');
const jsonHeandler = require('../models/json-heandler');
const router = express.Router();

//use - api/auth/login   body - email, password
router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    const email_reg = /\S+@\S+\.\S+/;

    if (!email || !password ) {
        res.status(400).send(`Missing Data: email or password are missing`);
        return; 
    }

    if(!email_reg.test(email)) {
        res.status(400).send(`Invalid Data: email address format is invalid`);
        return; 
    }

    try {
        const jsonDB = await jsonHeandler.getJson();

        if(!jsonDB[email] || jsonDB[email].password !== password ) {
            res.status(401).send(`Authentication Failure: email address or password is incorrect`);
            return; 
        }
        res.send({ auth: true });

    } catch (error) {
        console.log(error);
        res.status(500).send("Problem with the server DB connection");
    }
});

//use - api/auth/login   body - full_name ,email, password
router.post('/register', async (req, res) => {
    const { full_name, email, password } = req.body;
    const email_reg = /\S+@\S+\.\S+/;

    if (!email || !password || !full_name) {
        res.status(400).send(`Missing Data: email, password or full name are missing`);
        return; 
    }

    if(!email_reg.test(email)) {
        res.status(400).send(`Invalid Data: email address format is invalid`);
        return; 
    }

    try {
        const jsonDB = await jsonHeandler.getJson();

        if(jsonDB[email]) {
            res.status(400).send(`Registration Failure: user already exist`);
            return; 
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
        res.status(500).send("Problem with the server DB connection");
    }
});

module.exports = router;
