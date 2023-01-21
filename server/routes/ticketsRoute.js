const express = require('express')
const router = express.Router()
const { createTicket, getAlltickets, getSingleTicket, RemoveTicket, updateTicket } = require('../controllers/ticketController')
//const { requireLogin } = require("../controllers/authController")
const { expressjwt: jwt } = require("express-jwt");

//  1-POST เรียกใช้ ฟังก์ชั้น createTicket ใน ticketController เพื่อสร้าง Ticket 
router.post('/create', createTicket)

//  2-GET All  เรียกใช้ ฟังก์ชั้น getAllTicket ใน ticketController เพื่อแสดงข้อมูล
//router.get('/tickets', getAlltickets)
//router.get('/tickets', getAlltickets)


//  3-GET Single Ticket  เรียกใช้ ฟังก์ชั้น get ticket  เดียว
router.get('/tickets/:slug', getSingleTicket)

//  4-DELET Ticket  เรียกใช้ ฟังก์ชั้น get ticekt
router.delete('/tickets/:slug', RemoveTicket)

//  5-Update Ticket  เรียกใช้ ฟังก์ชั้น get ticekt
router.put('/tickets/update/:slug', updateTicket)

//Exports 
module.exports = router