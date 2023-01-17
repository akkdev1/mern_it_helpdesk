const jwt = require("jsonwebtoken")

exports.Login = (req, res) => {

    //เก็บ username กับ password
    //ชื่อ Properties จะต้องตรงกับ Front End คือ  username, password
    const { username, password } = req.body

    //ตรวจสอบข้อมูลการ Login (username , password) 

    if (!(username === process.env.USER_NAME)) {
        res.status(400).json({ error: "ป้อน Username ผิด !!" })
    }
    else if (!(password === process.env.PASSWORD)) {
        return res.status(400).json({ error: "ป้อน Password ผิด !!" })
    } else {

        // สร้าง TOKEN ด้วย username กำหนด Expired 1 วัน  => ส่งไปให้ Front End
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(200).json({
            token,
            username,
            message: `${username}`
        })
    }
}