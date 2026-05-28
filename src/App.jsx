import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom"

import Home from "./pages/Home"
import AdminDashboard from "./pages/AdminDashboard"

import "./index.css"

function FloatingAdminButton() {

  const location = useLocation()

  return (

    <div className="fixed top-5 right-5 z-[9999]">

      {location.pathname === "/admin" ? (

        <Link
          to="/"
          className="bg-black text-white px-6 py-3 rounded-2xl shadow-2xl font-bold hover:scale-105 transition duration-300"
        >
          View Website
        </Link>

      ) : (

        <Link
          to="/admin"
          className="bg-black text-white px-6 py-3 rounded-2xl shadow-2xl font-bold hover:scale-105 transition duration-300"
        >
          Admin Dashboard
        </Link>

      )}

    </div>
  )
}

export default function App() {

  return (

    <BrowserRouter>

      {/* FLOATING TOGGLE BUTTON */}
      <FloatingAdminButton />

      {/* ROUTES */}
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