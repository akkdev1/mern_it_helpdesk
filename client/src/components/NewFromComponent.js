import React from 'react'
import { useState } from "react" //ใช้งาน State หรือ การประกาศตัวแปร ใน React 
import { NavbarComponent } from "./NavbarComponent"
import axios from "axios";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import { getUser, getToken } from '../services/authService';


function NewFromComponent() {

    //สรา้ง State ในรูปแบบ "Object" เพื่อรับค่าจาก Form ในรูปแบบ Object (กำหนดค่าเริ่มต้นเป็น Null)
    const [stateTicket, setStateTicket] = useState({
        title: "", content: "", requester: getUser(), department: "", contact: "",
        remark: "", status: "", itstaff: "", itnote: ""
    })

    //สามารถนำ stateTicket มา *** Destrucing ลงตัวแปรได้  *****************
    // const { v_title, v_content, v_requester, v_department, v_contact,
    //     v_remark, v_status, v_itstaff, v_itnote } = stateTicket


    // Function ตรวจจับ Event OnChange ในแบบฟอร์มแล้ว Set ค่าให้ State Type Object 
    const checkInput = input_name => event => {
        console.log(input_name, '=', event.target.value)
        //Spread Operators แจกค่าลง
        setStateTicket({ ...stateTicket, [input_name]: event.target.value })
    }
    // eslint-disable-next-line

    // Clear แบบฟอร์ม--------------------------------
    const clearForm = (event) => {
        event.preventDefault();
        //เคลียร์ State
        setStateTicket({
            title: "", content: "", requester: "", department: "", contact: "",
            remark: "", status: "", itstaff: "", itnote: ""
        })
    }

    // Auto Redirect : เรียกใช้หลังมีการ Submit Form 
    const navigate = useNavigate()

    // Function บันทึกค่า State  ลง MONGO DB--------------------------------
    const submitForm = (event) => {
        event.preventDefault();

        //-<<<<<<<< ---ยิงข้อมูล API  เพื่อบันทึกข้อมูลลง MongoDB------------>>>>>>>>>>>>>>

        axios.post(`${process.env.REACT_APP_API}/create`,
            {
                title: stateTicket.title,
                content: stateTicket.content,
                requester: stateTicket.requester,
                department: stateTicket.department,
                contact: stateTicket.contact,
                remark: stateTicket.remark,
                // status: stateTicket.status,
                // itstaff: stateTicket.itstaff,
                // itnote: stateTicket.itnote,

            },
            // ยืนยัน Token กลับไปยัง Server  เพื่อบันทึกข้อมูล โดยใส่ไว้ใน headers
            {
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            }
        )
            .then(response => {
                //alert("บันทึกข้อมูลเรียบร้อย") 
                Swal.fire('Ticket Created!', 'แจ้งปัญหาเรียบร้อย', 'success')

                //เคลียร์ State
                setStateTicket({
                    title: "", content: "", requester: "", department: "", contact: "",
                    remark: "", status: "", itstaff: "", itnote: ""
                })

                navigate('/')

            })
            .catch(err => {
                //alert(err.response.data.error) 
                Swal.fire({
                    icon: 'error', title: 'Oops...', text: err.response.data.error, footer: '<a href="">Why do I have this issue?</a>'
                })
            })
    }


    //--------------------------------------View---------------------------------
    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1>New IT Service Request | Ticket : Information</h1>
            <hr></hr>
            {/* {JSON.stringify(stateTicket)} */}
            <hr></hr>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ปัญหา|ความต้องการ : Issue | Request ✒</label>
                    <input type="text" className="form-control" value={stateTicket.title}
                        onChange={checkInput("title")} />
                </div>

                <div className="form-group">
                    <label>เนื้อหา|รายละเอียด : Content | Description 📝</label>
                    <textarea className="form-control" value={stateTicket.content}
                        onChange={checkInput("content")}
                    />
                </div>

                <div className="form-group">
                    <label>ชื่อผู้แจ้งปัญหา : Requester 👦</label>
                    <input type="text" className="form-control" value={stateTicket.requester}
                        onChange={checkInput("requester")}
                    />
                </div>

                <div className="form-group">
                    <label>สังกัดหน่วยงาน : Department 🏚</label>
                    <input type="text" className="form-control" value={stateTicket.department}
                        onChange={checkInput("department")}
                    />
                </div>

                <div className="form-group">
                    <label>ข้อมูลติดต่อกลับ : Contact info 📞📧</label>
                    <input type="text" className="form-control" value={stateTicket.contact}
                        onChange={checkInput("contact")}
                    />
                </div>

                <div className="form-group">
                    <label>หมายเหตุเพิ่มเติม : Remark</label>
                    <textarea className="form-control" value={stateTicket.remark}
                        onChange={checkInput("remark")}
                    />
                </div>
                <input type="submit" className="btn btn-success mr-1" value="ส่งปัญหา | Submit Ticket" />
                <input type="#" className="btn btn-primary mr-1" defaultValue="เคลียร์ฟอร์ม | Reset" onClick={clearForm} />
                <hr></hr>
                <p> ------- ส่วนของเจ้าหน้าที่ | IT Officer information ------</p>
                <hr></hr>
                <div className="form-group">
                    <label>จนท.IT | IT Staff</label>
                    <label>{stateTicket.itstaff}</label>
                </div>

                <div className="form-group">
                    <label>ข้อมูลการดำเนินงาน | IT Note</label>
                    <label>{stateTicket.itnote}</label>
                </div>

                <div className="form-group">
                    <label>สถานะการดำเนินงาน | Process Status</label>
                    <label>{stateTicket.status}</label>
                </div>

            </form>
        </div>
    )
}

export default NewFromComponent