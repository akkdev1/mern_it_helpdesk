import React from 'react'
import { Link, useNavigate } from "react-router-dom" //กำหนดค่า Router V6 ใช้ Navigate ในการ redirect page
import { getUser } from "../services/authService"

export const NavbarComponent = () => {
    const navigate = useNavigate()
    const Logout = () => {
        navigate('/')

        if (window !== "undefined") {

            // Remove ข้อมูลออกจาก sessionStorage
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("username")
            //window.location.reload(); //การ Refresh 
        }

    }
    //-----------------------------VIEW-------------------------
    return (
        <nav>
            <ul className='nav nav-tabs'>
                <li className='nav-item pr-3 pt-3 pb-3'>
                    <Link to="/" className='nav-link'>หน้าแรก | Home</Link>
                </li>
                {
                    getUser() && (
                        <li className='nav-item pr-3 pt-3 pb-3'>
                            <Link to="/create" className='nav-link'>แจ้งปัญหา | Create Ticket</Link>
                        </li>
                    )
                }

                {/* เช็คว่ามีการเข้าระบบ ? Yes => Show "Log Out" */}
                {
                    !getUser() && (
                        <li className='nav-item pr-3 pt-3 pb-3'>
                            <Link to="/login" className='nav-link'>เข้าสู่ระบบ | Log In</Link>
                        </li>)
                }
                {
                    getUser() && (
                        <li className='nav-item pr-3 pt-3 pb-3'>
                            <button className='nav-link' style={{ backgroundColor: "white", color: "blue" }} onClick={() => Logout()}>ออกจากระบบ | Log Out</button>
                        </li>)
                }
            </ul>
        </nav>
    )
}
