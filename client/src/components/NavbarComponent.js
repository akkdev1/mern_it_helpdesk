import React from 'react'
import { Link } from "react-router-dom" //กำหนดค่า Router V6 ใช้ Navigate ในการ redirect page


export const NavbarComponent = () => {

    return (
        <nav>
            <ul className='nav nav-tabs'>
                <li className='nav-item pr-3 pt-3 pb-3'>
                    <Link to="/" className='nav-link'>หน้าแรก | Home</Link>
                </li>

                <li className='nav-item pr-3 pt-3 pb-3'>
                    <Link to="/create" className='nav-link'>แจ้งปัญหา | Create Ticket</Link>
                </li>

                <li className='nav-item pr-3 pt-3 pb-3'>
                    <Link to="/login" className='nav-link'>เข้าสู่ระบบ | Log In</Link>
                </li>


            </ul>
        </nav>
    )
}
