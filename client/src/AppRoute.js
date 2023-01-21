import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import App from "./App"
import React from 'react'
import NewFormComponent from "./components/NewFromComponent"
import TicketComponent from "./components/TicketComponent"
import UpdateComponent from "./components/UpdateComponent"
import LoginComponent from "./components/LoginComponent"
import AdminRoute from "./AdminRoute"
//import AdminRoute2 from "./AdminRoute2"

function AppRoute() {
    return (
        <Router>
            <Routes>

                <Route path="/" exact element={<App />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/create" element={
                    <AdminRoute>
                        <NewFormComponent />
                    </AdminRoute>
                } />

                <Route path="/tickets/:slug" element={<TicketComponent />} />

                <Route path="/tickets/update/:slug" element={
                    //<AdminRoute2>
                    <UpdateComponent />
                    //</AdminRoute2>
                } />


                {/* <Route path="/create" element={<AdminRoute />}>
                    <Route path="" element={<NewFormComponent />} />
                </Route> */}

            </Routes>
        </Router>
    )
}

export default AppRoute