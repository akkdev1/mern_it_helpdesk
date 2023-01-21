import { getUser } from "./services/authService"
import { Navigate } from "react-router-dom"
import NewFromComponent from "./components/NewFromComponent"


// 1- สรา้ง AdminRoute เพื่อใช้ตรวจสอบ Componet / Page ที่ส่งเข้ามา
const AdminRoute = () => (
    getUser() ? (<NewFromComponent />) : (<Navigate to="/login" replace />)
)




//const AdminRoute = ({ component: Component, ...rest }) => 

// <Route
//     {...rest}
//     render={props =>
//         getUser() ?
//             (<Component {...props} />) :
//             (<Navigate to="/login" replace />)
//         // (<Navigate
//         //     to={{ pathname: "/login", state: { from: props.loction } }}
//         // />
//         // )
//     }
// />

export default AdminRoute