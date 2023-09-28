const auth = require('../auth/auth-manager');
const bcrypt = require('bcryptjs')
const AuthDAO = require('../dao/auth-dao');

const getLoggedIn = async (req, res) => {
    try {
        let id = auth.verifyUser(req);
        if (!id) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        } else {
            auth.verify(req, res, async function () {
                id = req.id
            })
        }
        console.log(id)
        if (!id) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
        })}

        const loggedInUser = await AuthDAO.getUserById(id);
        console.log("ID", loggedInUser)

        return res.status(200).json({
            loggedIn: true,
            user: {
                username: loggedInUser.username,
                email: loggedInUser.email,
                id: loggedInUser.id
            }
        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(201).json({ errorMessage: "Please enter all required fields." });
        }
        const existingUser = await AuthDAO.getUserByLogin(email);
        if (!existingUser) {
            return res.status(201).json({errorMessage: "Wrong email or password provided."})
        }
        const passwordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!passwordCorrect) {
            return res
                .status(201)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }
        const token = auth.signToken(existingUser.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
        }).status(200).json({
            success: true,
            user: {
                username: existingUser.username,
                email: existingUser.email,
                id: existingUser.id,
                token: token
            }
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).status(200).json({
        success: true,
    })
}

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res
                .status(201)
                .json({ errorMessage: "Please enter all required fields." });
        }
        const existingUser = await AuthDAO.getUserByLogin(email);
        if (existingUser) {
            return res.status(201).json({
                success: false,
                errorMessage: "An account with this email address already exists."
            })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = {
            username: username,
            email: email,
            password: passwordHash,
        };

        const savedUser = await AuthDAO.createUser(newUser);

        return res.status(200).json({
            user: {
                username: savedUser.username,
                email: savedUser.email,
                id: savedUser.id,
            },
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).send();
    }
}

module.exports= {
    getLoggedIn,
    login,
    logout,
    register
}