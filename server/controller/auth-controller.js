const db = require('../db/database');

const login = async (req, res) => {
    res.json("login triggered");
    const {email} = req.body;

    db.collection('users').child
}

const register = async (req, res) => {
    res.json("register triggered")
}

module.exports= {
    login,
    register
}