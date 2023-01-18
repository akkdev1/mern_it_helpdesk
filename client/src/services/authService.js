//ฟังก์ชั่นเก็บข้อมูล TOKEN และ Username 
export const authenticate = (response, next) => {
    if (window !== "undefined") {

        //เก็บข้อมูลลงใน session storage
        sessionStorage.setItem("token", JSON.stringify(response.data.token))
        sessionStorage.setItem("username", JSON.stringify(response.data.username))
    }
    next()
}