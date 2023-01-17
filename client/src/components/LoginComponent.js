import React from 'react'
import { useState } from "react"
import { NavbarComponent } from "./NavbarComponent"
import Swal from 'sweetalert2'
//import { useNavigate } from "react-router-dom"
import axios from "axios";

const LoginComponent = () => {
    //สรา้ง State ในรูปแบบ "Object" เพื่อรับค่าจาก Form ในรูปแบบ Object (กำหนดค่าเริ่มต้นเป็น Null)
    const [stateLogin, setStateLogin] = useState({
        username: "", password: ""
    })

    //Destruc stateLogin ลงตัวแปร (Option จะทำก็ได้)
    //ชื่อ Properties จะต้องตรงกับ Back End คือ  username, password
    const { username, password } = stateLogin

    // Function ตรวจจับ Event OnChange ในแบบฟอร์มแล้ว Set ค่าให้ State Type Object 
    const checkInput = input_name => event => {
        console.log(input_name, '=', event.target.value)

        //Spread Operators แจกค่าลง
        setStateLogin({ ...stateLogin, [input_name]: event.target.value })
    }

    // ตรวจสอบการ Login 
    const submitForm = (event) => {
        event.preventDefault()

        //<<---------------AXIOS API -------------------->>>
        //<<---------------POST ข้อมูล Login -------------------->>> 
        axios
            .post(`${process.env.REACT_APP_API}/login`, { username, password })

            // OK  -> Res 
            .then(res => {
                console.log(res.data)
                Swal.fire('Welcome', res.data.message, 'success')
            })
            // Error  -> Alert
            .catch(err => {
                console.log(err.response.data.error)
                //alert(err.response.data.error) 
                Swal.fire({
                    icon: 'error', title: 'Oops...', text: err.response.data.error, footer: '<a href="">Why do I have this issue?</a>'
                })
            })
    }

    //===============================VIEW=============================
    return (

        <div className="container p-5">
            <NavbarComponent />
            <h2>เข้าสู่ระบบ | LogIn IT Helpdesk</h2>
            <hr></hr>
            {/* {JSON.stringify(stateLogin)} */}
            <hr></hr>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={username}
                        onChange={checkInput("username")} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password}
                        onChange={checkInput("password")}
                    />
                </div>

                <input type="submit" className="btn btn-success mr-1" value="เข้าสู่ระบบ | LogIn" />

            </form>
        </div>

    )
}

export default LoginComponent
