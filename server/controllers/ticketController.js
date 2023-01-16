//ทำหน้าที่ติดต่อ และ ดำเนินการกับ  Database
//นำ Slugify  เข้ามา ช่วยในการสรา้ง KEY 
const slugify = require('slugify')
const TicketModel = require('../models/ticketModel')
const { v4: uuidv4 } = require('uuid');


//1- ฟังก์ชั่นการบันทึกข้อมูล ----------createTicket------------------------------------
exports.createTicket = (req, res) => {
    // res.json({
    //     message: "RES FROM TicketController-Created",
    // })

    // 1-1 รับข้อมูล Request Body โดยข้อมูลเป็น data object เก็บไว้ในตัวแปร ticket_obj
    const ticket_obj = req.body // 
    console.log("ข้อมูล Title => " + ticket_obj.title) //Debug

    // 1-2 แจกแจงข้อมูล ticket_obj  ด้วยการ Destructoring *โดยชื่อ properties จะต้องตรงกันกับ model
    // กรณีที่ไม่ทำ De-Structuring เราสามารถใช้ Obj.properties แทนก็ได้
    const { title, content, requester, department,
        contact, remark, status, itstaff, itnote } = ticket_obj


    //1-3 ตรวจสอบ (ค่าว่าง) ข้อมูล
    switch (true) {
        case !ticket_obj.title: res.status(400).json({ error: "กรุณาป้อน : หัวข้อปัญหา" })
        case !ticket_obj.content: res.status(400).json({ error: "กรุณาป้อน : รายละเอียดปัญหา" })
        case !requester: res.status(400).json({ error: "กรุณาป้อน : ชื่อผู้แจ้งฯ" })
        case !department: res.status(400).json({ error: "กรุณาป้อน : หน่วยงาน" })
        case !contact: res.status(400).json({ error: "กรุณาป้อน : ข้อมูลติดต่อกลับ" })
            break;
    }

    //1-4 เพิ่ม Slugify โดยเอาค่า Title มาสร้างข้อมูล , ตรวจสอบค่าว่างที่เกิดจาก Title เป็นภาษาไทย โดยใช้ UUID
    const slug = slugify(title)
    if (!slug) {
        slug = uuidv4()
    }

    //1-5 บันทีกข้อมูลลง Mongo DB 
    TicketModel // เรียกใช้ model TicketModel
        .create({
            title, content, requester, department, contact, remark, status, itstaff, itnote, slug
        }, (err, ticket_data) => {
            if (err) {
                res.status(400).json({ error: "เกิดปัญหาในขณะบันทึกข้อมูล หรือ ป้อนข้อมูล Tittle ซ้ำ !!!" })
            }
            res.status(200).json(ticket_data)
        })

}


//2-Remove ฟังก์ชั่นลบข้อมูล  findOneAndRemove --------------------------------------------
exports.RemoveTicket = (req, res) => {
    let { slug } = req.params;

    TicketModel  // เรียกใช้ model TicketModel
        .findOneAndRemove({ slug })
        .exec((error, query_ticket) => {
            if (!query_ticket) {
                res.status(400).json({ error: "ไม่พบข้อมูล !!!" })
            } else if (error) {
                res.status(400).json({ error: "เกิดข้อขัดข้อง !!!" })
            } else {
                //respone กลับไปให้ Front End
                res.status(200).json({ message: "ลบ Ticeket เรียบร้อย" })
            }
        })
}


// 3- Find All ฟังก์ชั้นการค้น All ข้อมูลใน Model Ticket ----------------------------
exports.getAlltickets = (req, res) => {

    TicketModel // เรียกใช้ model TicketModel
        .find({})
        .exec((error, query_ticket) => {
            res.status(200).json(query_ticket) //ส่ง tickets all ไปให้ Fornt End 
        })
}


// 4- FindOne ฟังก์ชั้นการค้น Single ข้อมูลใน Model Blog ตรวจจับ Error และ ข้อผิดพลาด-------------------------
exports.getSingleTicket = (req, res) => {
    let { slug } = req.params;

    TicketModel // เรียกใช้ model TicketModel
        .findOne({ slug })
        .exec((error, query_ticket) => {
            if (!query_ticket) {
                res.status(400).json({ error: "ไม่พบข้อมูล !!!" })
            } else if (error) {
                res.status(400).json({ error: "เกิดข้อขัดข้องบางประการ !!!" })
            } else {
                res.status(200).json(query_ticket)
            }

        })
}

//  5-Update ฟังก์ชั่นแก้ไข Update ข้อมูล  (การสรา้ง + การลบ)  --------------------------------------------
exports.updateTicket = (req, res) => {
    //9-0 เก็บ Params หรือ Slug  ที่ส่งมาจาก Front End
    const { slug } = req.params;
    console.log(slug)
    //9-1 เก็บข้อมูล JSON ที่ส่งมาจาก Front End
    const ticket_obj = req.body

    // Option (แจกแจงหรือไม่ก็ได้) 9-2 แจกแจงข้อมูล ในก้อน Object
    //const { title, content } = ticket_obj

    //9-3 เริ่มทำการ Queryตาม Slug Key   และ UpDate
    TicketModel
        .findOneAndUpdate({ slug }, {
            title: ticket_obj.title,
            content: ticket_obj.content,
            requester: ticket_obj.requester,
            department: ticket_obj.department,
            contact: ticket_obj.contact,
            remark: ticket_obj.remark,
            status: ticket_obj.status,
            itstaff: ticket_obj.itstaff,
            itnote: ticket_obj.itnote,
        })
        .exec((error, query_ticket) => {
            if (!query_ticket) {
                res.status(400).json({ error: "ไม่พบข้อมูล !!!" })
            } else if (error) {
                res.status(400).json({ error: "เกิดข้อขัดข้อง !!!" })
            } else {
                res.status(200).json({ message: "Update ข้อมูลเรียบร้อย ✔" }) //respone =>  กลับไปให้ Front End
            }

        })
}