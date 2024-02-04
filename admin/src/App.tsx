import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminProvider from "./context/AdminContext";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <>
      <BrowserRouter>
        <AdminProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AdminProvider>
      </BrowserRouter>
    </>
  )
}
export default App