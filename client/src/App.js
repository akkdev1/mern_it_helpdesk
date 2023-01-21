import { NavbarComponent } from "./components/NavbarComponent";
import { useState, useEffect } from "react"
import axios from "axios";
import { Link } from 'react-router-dom';
//import Swal from 'sweetalert2'

function App() {

  //สรา้ง State :stateAllTickets  ในรูปแบบ "Array [objects] " เพื่อรับค่าจาก Server(กำหนดค่าเริ่มต้นเป็น Null)
  const [stateAllTickets, setStateAllTickets] = useState([])

  //1-ดักจับการเปิด หรือ Render หน้าเว็บ-----------------------------
  useEffect(() => {
    fetchAllTickets()
  }, [])


  // 2-ฟังก์ชั่น Fecth ข้อมูล Ticket ทั้งหมด จาก Server ด้วย API -----------------
  const fetchAllTickets = () => {

    //2-1 ยิง API------GET Path ตามที่กำหนดไว้ใน NODE JS BackEnd-----------------------
    axios.get(`${process.env.REACT_APP_API_ALL}/tickets`)

      //2-2 Data response Set ลงตัวแปร State
      .then(response => {
        setStateAllTickets(response.data)
      })
      .catch(err => alert(err))
  }

  //========================================================
  //========================= View =========================
  return (
    <div className="container p-5">
      <NavbarComponent></NavbarComponent>
      <h2>IT HelpDesk Application : MERN Stack </h2>
      <hr></hr>
      {/* {JSON.stringify(stateAllTickets)} */}
      <hr></hr>

      {/* ทำการ MAP Array จะได้  ticket = object ออกมา , แยก Key={index} เพื่อให้ React ใช้แสดงผล */}
      {stateAllTickets.map((ticket, index) => (
        <div className="row" key={index} style={{ borderBottom: '1px solid silver' }}>
          <div className="col pt-3 pb-2">

            <Link to={`/tickets/${ticket.slug}`}>
              <h2>{ticket.title}</h2>
            </Link>

            <br></br>
            <p>💡สถานะ | Status: {ticket.status}</p>
            <p>📝รายละเอียด | Content: {ticket.content}</p>
            <p>👦ผู้แจ้ง | Requester: {ticket.requester}  # 🏚หน่วยงาน | Department: {ticket.department} </p>
            <p>📞📧ข้อมูลติดต่อกลับ | Contact info: {ticket.contact}</p>
            <p>หมายเหตุ | Remark : {ticket.remark}</p>
            <p className="text-muted">ID : {ticket._id} # วันที่แจ้ง📆:{new Date(ticket.createdAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default App;
