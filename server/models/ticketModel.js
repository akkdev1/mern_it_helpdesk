const mongoose = require("mongoose")

//สร้างสคีมา หรือ โครงสรา้ง data table
const ticketSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: {}, required: true },
        requester: { type: String, required: true },
        department: { type: String, required: true },
        contact: { type: String, required: true },
        remark: { type: String },
        status: { type: String, default: "New Request" },
        itstaff: { type: String, default: "IT Robot🤖" },
        itnote: { type: String },
        slug: { type: String, lowercase: true, unique: true }
    },
    { timestamps: true })

//สรา้งโมเดล Ticket 
const TicketModel = mongoose.model("ticket", ticketSchema)


//นำออกไปใช้งาน ใน Controller 
module.exports = TicketModel
//module.exports = mongoose.model("ticket", ticketSchema)
