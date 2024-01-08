import { Route, Routes } from "react-router-dom";
// import Login from "./components/Login";
// import Dashboard from "./pages/Dashboard";
import AdminProvider from "./context/AdminContext";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
// import Dashboard from "./components/Dashboard";
// import { useEffect } from "react";
// import { useAdminContext } from "./context/AdminContext";

// function getCookie(key: string) {
//   const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");

//   return b ? b.pop() : '';
// }


function App() {
  // const { loginAdmin } = useAdminContext();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const cookie = getCookie('connect.sid');

  // if(cookie){
  //   navigate("/dashboard", {replace:true})
  // }
  // }, [navigate])
  // const [cookieExists, setCookieExists] = useState(false);
  
  
    return (
      <div>
        <AdminProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AdminProvider>
    </div>
    )
  }

export default App
