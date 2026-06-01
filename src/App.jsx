import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import AdminDashboard from "./pages/AdminDashboard"

import "./index.css"

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>

    </BrowserRouter>
  )
}