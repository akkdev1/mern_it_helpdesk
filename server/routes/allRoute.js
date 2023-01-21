const express = require('express')
const router = express.Router()
const { getAlltickets } = require('../controllers/ticketController')
//const { requireLogin } = require("../controllers/authController")
//const { expressjwt: jwt } = require("express-jwt");


//  2-GET All  เรียกใช้ ฟังก์ชั้น getAllTicket ใน ticketController เพื่อแสดงข้อมูล
router.get('/tickets', getAlltickets)

//Exports 
module.exports = router