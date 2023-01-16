//ใช้ UseParam เพื่อเก็บค่า param แทนการใช้ props *******************
import React from 'react'
import { useParams, Link, useNavigate } from "react-router-dom";
import { NavbarComponent } from "./NavbarComponent"
import { useState, useEffect } from "react"
import axios from "axios";
import Swal from 'sweetalert2'


const TicketComponent = () => {
    //ใช้ UseParam เพื่อเก็บค่า param แทนการใช้ props ***********8
    let param = useParams();

    //สร้างตัวแปร TicketState
    const [stateTicket, setStateTicket] = useState("")

    //----------------------API-----------------------------
    useEffect(() => {
        axios
            //ยิง API------GET Path ตามที่กำหนดไว้ใน NODE JS BackEnd----------------------------------------
            .get(`${process.env.REACT_APP_API}/tickets/${param.slug}`)
            // Data response Set ลงตัวแปร State..
            .then(api_res_data => { setStateTicket(api_res_data.data) })
            .catch(err => alert(err))

        // การ Scroll ไปบนสุด
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    //---------------  การ  Confirm & Remove ---------------------------------------
    // Auto Redirect : เรียกใช้หลังมีการ Submit Form 
    const navigate = useNavigate()

    // 3- การ Remove ---------------------------------------------------------------
    // 3-1 การ Confrim ก่อน Remove  
    const confirmDelete = (slug) => {

        Swal.fire({
            title: "คุณต้องการลบข้อมูล ? ",
            icon: "warning",
            showCancelButton: true
        })
            .then((result) => {
                if (result.isConfirmed)  //กรณียืนยัน เรียกใช้ฟังก์ชั่นการลบ + param 
                    performRemove(slug)
            })
    }

    //3-2 ยิง API Delete Data ไป Back End ---------------------------
    const performRemove = (slug) => {

        axios
            .delete(`${process.env.REACT_APP_API}/tickets/${slug}`)
            .then(response => {
                Swal.fire({ icon: 'success', title: response.data.message, })
                //fetchAllTickets();
                navigate('/')
            })
            .catch(err => alert(err))
    }


    //----------------------------------View--------------------------------
    return (
        <div className='container p-5'>
            <NavbarComponent />
            {/* <div>{JSON.stringify(param)}</div> */}
            <h3> หัวข้อปัญหา | Title: {stateTicket.title}</h3>
            <hr></hr>
            <p>💡สถานะ | Status: {stateTicket.status}</p>
            <p className="text-muted"> ID : {stateTicket._id} # วันที่แจ้ง📆:{new Date(stateTicket.createdAt).toLocaleString()}</p>
            <p>👦ผู้แจ้ง | Requester: {stateTicket.requester}
                # 🏚หน่วยงาน | Department: {stateTicket.department} </p>
            <p>📞📧ข้อมูลติดต่อกลับ | Contact info: {stateTicket.contact}</p>

            <label>📝รายละเอียดปัญหา /ความต้องการ  | Issue / Request Content: :</label>
            <p>
                <textarea rows="3" disabled className="form-control"
                    value={stateTicket.content} />
            </p>

            <label>หมายเหตุ | Remark   | Issue / Request Content: :</label>
            <p>
                <textarea rows="3" disabled className="form-control"
                    value={stateTicket.remark} />
            </p>

            <hr></hr>
            <p style={{ color: "blue" }}>ข้อมูลส่วนของ IT</p>
            <p>เจ้าหน้าที่ IT ผู้รับผิดชอบ : {stateTicket.itstaff}</p>
            <label>รายละเอียดการดำเนินงาน:</label>
            <p>
                <textarea rows="3" disabled className="form-control"
                    value={stateTicket.itnote} />
            </p>
            <Link className="btn btn-outline-success"
                to={`/tickets/update/${stateTicket.slug}`}>Update | Edit</Link> &nbsp;


            <button className="btn btn-outline-danger"
                onClick={() => confirmDelete(stateTicket.slug)}>Remove Ticket</button>
            <hr></hr>
        </div >

    )
}
export default TicketComponent