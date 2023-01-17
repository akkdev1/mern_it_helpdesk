const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const ticketsRoute = require('./routes/ticketsRoute')
const authRoute = require('./routes/authRoute')
require("dotenv").config()


//console.log(process.env)

///Connect Cloud Database ---------------------------------------------
mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
})
    .then(function () {
        return console.log("*********** เชื่อมต่อฐานข้อมูล On Cloud เรียบร้อย *************")
    })
    .catch(function (error) {

        return console.log(error)
    })


//Middle ware ----------------------------------------------------------------
// app.use(express.json())
// app.use(cors)
// app.use(morgan("dev"))

app.use(express.json())  // ให้บริการ json กลับไป เป็นการให้บริการข้อมูล json ของ Server
app.use(cors()) // ให้บริการ json
app.use(morgan("dev")) //ให้บริการดักตัว Request

//Route
//เรียกใช้ route ////////////////////////////////////
app.use('/api', ticketsRoute);
app.use('/api', authRoute);
app.get("*", (req, res) => {
    res.json(
        {
            message: "+++++ RES from Express Server ++++++++ "
        }
    )
})



//Server Start -----------------------------------------------------------
const server_port = process.env.PORT || 8080
app.listen(server_port, () => console.log(`*****Server Runing on Port ${server_port}*****`))