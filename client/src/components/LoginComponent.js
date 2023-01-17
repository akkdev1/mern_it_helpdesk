import React from 'react'
import { useState } from "react"
import { NavbarComponent } from "./NavbarComponent"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

const LoginComponent = () => {
    //สรา้ง State ในรูปแบบ "Object" เพื่อรับค่าจาก Form ในรูปแบบ Object (กำหนดค่าเริ่มต้นเป็น Null)
    const [stateLogin, setStateLogin] = useState({
        username: "", password: ""
    })

    //Destruc stateLogin ลงตัวแปร (Option จะทำก็ได้)
    const { v_username, v_password } = stateLogin

    // Function ตรวจจับ Event OnChange ในแบบฟอร์มแล้ว Set ค่าให้ State Type Object 
    const checkInput = input_name => event => {
        console.log(input_name, '=', event.target.value)

        //Spread Operators แจกค่าลง
        setStateLogin({ ...stateLogin, [input_name]: event.target.value })
    }




    //===============================VIEW=============================
    return (

        <div className="container p-5">
            <NavbarComponent />
            <h2>เข้าสู่ระบบ | LogIn IT Helpdesk</h2>
            <hr></hr>
            {/* {JSON.stringify(stateLogin)} */}
            <hr></hr>
            <form>
                {/* <form onSubmit={submitForm}> */}
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={v_username}
                        onChange={checkInput("username")} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={v_password}
                        onChange={checkInput("password")}
                    />
                </div>

                <input type="submit" className="btn btn-success mr-1" value="เข้าสู่ระบบ | LogIn" />
                {/* <input type="#" className="btn btn-primary mr-1" defaultValue="เคลียร์ฟอร์ม | Reset" onClick={clearForm} /> */}

            </form>
        </div>

    )
}

export default LoginComponent
