import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminProvider from "./context/AdminContext";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";

function App() {  
    return (
      <>
        <BrowserRouter>
          <AdminProvider>
            <Routes>
              <Route path="/" element={<Login />}/>
              <Route path="/dashboard" element={<Dashboard />}/>
            </Routes>
          </AdminProvider>
        </BrowserRouter>
      </>
    )
  }
export default App






// function getCookie(key: string) {
//   const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");

//   return b ? b.pop() : '';
// }
