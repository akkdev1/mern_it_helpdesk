const express = require('express')
const router = express.Router()
const { Login } = require('../controllers/authController')

//  1-POST เรียกใช้ ฟังก์ชั้น Login
router.post('/login', Login)

//Exports 
module.exports = router