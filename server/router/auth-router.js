const express = require('express')
const router = express.Router()
const AuthController = require('../controller/auth-controller')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/logout', AuthController.logout)

router.get('/test', (req, res)=>{res.json("here")})

module.exports = router