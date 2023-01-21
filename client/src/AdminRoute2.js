import { getUser } from "./services/authService"
import { Navigate } from "react-router-dom"
import UpdateComponent from "./components/NewFromComponent"


// 1- สรา้ง AdminRoute เพื่อใช้ตรวจสอบ Componet / Page ที่ส่งเข้ามา
const AdminRoute2 = () => (
    getUser() ? (<UpdateComponent />) : (<Navigate to="/login" replace />)
)


export default AdminRoute2