//ฟังก์ชั่นเก็บข้อมูล TOKEN และ Username เข้า session
export const authenticate = (response, next) => {
    if (window !== "undefined") {

        // Set ข้อมูลลงใน session storage
        sessionStorage.setItem("token", JSON.stringify(response.data.token))
        sessionStorage.setItem("username", JSON.stringify(response.data.username))
    }
    next()
}

// ฟังก์ชั่นดึงข้อมูล Token ใน session storage
export const getToken = () => {
    if (window !== "undefined") {
        if (sessionStorage.getItem("token")) {
            return JSON.parse(sessionStorage.getItem("token"))
        } else {
            return false
        }
    }
}

// ฟังก์ชั่นดึงข้อมูล User ใน session storage
export const getUser = () => {
    if (window !== "undefined") {
        if (sessionStorage.getItem("username")) {
            return JSON.parse(sessionStorage.getItem("username"))
        } else {
            return false
        }
    }
}


// ฟังก์ชั่น Logout
// export const Logout = () => {
//     if (window !== "undefined") {
//         // Remove ข้อมูลออกจาก sessionStorage
//         sessionStorage.removeItem("token")
//         sessionStorage.removeItem("username")
//         window.location.reload();

//     }
// }