import React from 'react'
import { NavbarComponent } from "./NavbarComponent"
import { useState, useEffect } from "react"
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { getToken } from '../services/authService';

const UpdateComponent = () => {

    //1 สรา้ง State แบบ Object เพื่อรับค่าจาก Form ทั้ง 3 ค่าในรูปแบบ Object (กำหนดค่าเริ่มต้นเป็นค่าว่าง)
    const [stateTicket, setStateTicket] = useState({
        title: "", content: "", requester: "", department: "", contact: "",
        remark: "", status: "", itstaff: "", itnote: "", slug: ""
    })

    // 2 ใช้ Param เพื่อเก็บค่า Slug 
    const param = useParams();

    // 3  ดึงข้อมูล Blog ที่ต้องการ  เหมือน Single
    useEffect(() => {

        //3-1 ยิง API ครั้งที่ 1 เพื่อดึงข้อมูลปัจจุบัน 
        axios
            .get(`${process.env.REACT_APP_API}/tickets/${param.slug}`,
                // ยืนยัน Token กลับไปยัง Server  เพื่อบันทึกข้อมูล โดยใส่ไว้ใน headers
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }
            )
            //3-2 Data response Set ลงตัวแปร stateTicket
            .then(api_res_data => { setStateTicket(api_res_data.data) })

            .catch(err => alert(err))

        // การ Scroll ไปบนสุด
        window.scrollTo(0, 0)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //===========================================================================
    //======================UpdateForm = ฟังก์ชั่นพิเศษ ()=>() ===========================

    const showUpdateForm = () => (
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label>ปัญหา|ความต้องการ : Issue | Request ✒</label>
                <input disabled type="text" className="form-control" value={stateTicket.title}
                    onChange={checkInput("title")} />
            </div>

            <div className="form-group">
                <label>เนื้อหา|รายละเอียด : Content | Description 📝</label>
                <textarea disabled className="form-control" value={stateTicket.content}
                    onChange={checkInput("content")}
                />
            </div>

            <div className="form-group">
                <label>ชื่อผู้แจ้งปัญหา : Requester 👦</label>
                <input disabled type="text" className="form-control" value={stateTicket.requester}
                    onChange={checkInput("requester")}
                />
            </div>

            <div className="form-group">
                <label>สังกัดหน่วยงาน : Department 🏚</label>
                <input disabled type="text" className="form-control" value={stateTicket.department}
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


            <input type="submit" className="btn btn-success mr-1" value="บันทึกข้อมูล | Save" />
            <input type="#" className="btn btn-primary mr-1" defaultValue="ยกเลิก | Cancel" onClick={navigateHome} />
            <hr></hr>
            <p> ------- ส่วนของเจ้าหน้าที่ | IT Officer information ------</p>
            <hr></hr>

            <div className="form-group">
                <label>จนท.IT | IT Staff</label>
                <input type="text" className="form-control" value={stateTicket.itstaff}
                    onChange={checkInput("itstaff")}
                />
            </div>

            <div className="form-group">
                <label>ข้อมูลการดำเนินงาน | IT Note</label>
                <textarea className="form-control" value={stateTicket.itnote}
                    onChange={checkInput("itnote")}
                />
            </div>

            <div className="form-group">
                <label>สถานะการดำเนินงาน | Process Status</label>&nbsp;
                <select style={{ backgroundColor: "" }} className="form-control" value={stateTicket.status} onChange={checkInput("status")} >
                    <option value="New Request">New Request</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
        </form >
    )

    //=========================== Update PART===================================
    //==========================================================================
    // Function ตรวจจับ Event OnChange ในแบบฟอร์มแล้ว Set ค่าให้ State Type Object 
    const checkInput = input_name => event => {
        console.log(input_name, '=', event.target.value)
        //Spread Operators แจกค่าลง
        setStateTicket({ ...stateTicket, [input_name]: event.target.value })
    }
    // eslint-disable-next-line

    // Function บันทึกค่า State  ลง MONGO DB--------------------------------
    const submitForm = (event) => {

        event.preventDefault();
        const slug = param.slug

        //-<<<----ยิงข้อมูล API  เพื่อบันทึกข้อมูลลง MongoDB===========>>>>>>>>>>>>

        axios.put(`${process.env.REACT_APP_API}/tickets/update/${slug}`,
            {
                title: stateTicket.title,
                content: stateTicket.content,
                requester: stateTicket.requester,
                department: stateTicket.department,
                contact: stateTicket.contact,
                remark: stateTicket.remark,
                status: stateTicket.status,
                itstaff: stateTicket.itstaff,
                itnote: stateTicket.itnote,
            },
            // ยืนยัน Token :Bearer กลับไปยัง Server  เพื่อบันทึกข้อมูล โดยใส่ไว้ใน headers
            {
                headers: {
                    authorization: `Bearer ${getToken()}`
                }
            }
        )
            .then(response => {

                //alert("บันทึกข้อมูลเรียบร้อย") 
                Swal.fire('Ticket Updated!', 'Update ข้อมูลเรียบร้อย', 'success')

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

    // Auto Redirect : เรียกใช้หลังมีการ Submit Form 
    const navigate = useNavigate()
    const navigateHome = () => {
        navigate('/')
    }


    //=================  View ===============================
    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1>Update | Edit : {stateTicket.title}</h1>
            <hr></hr>
            {/* <div>{JSON.stringify(stateTicket)}</div> */}
            <hr></hr>

            {/* แบบฟอร์ม ShowUpdate สรา้งเป็น Function JSX  */}
            {showUpdateForm()}

        </div>

    )
}

export default UpdateComponent