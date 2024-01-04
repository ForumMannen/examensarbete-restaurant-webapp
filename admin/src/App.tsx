// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Preferences from "./pages/Preferences";
// import Login from "./components/Login";
// import PrivateRoute from "./components/PrivateRoute";
// import { useState } from "react";


// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//   }

//   return (
//     <div className="wrapper">
//       <h1>Application</h1>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={
//             isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
//           }/>

//           <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          
//           {/* Protected routes */}
//           <Route path="/dashboard" element={<Dashboard />} isAuthenticated={isAuthenticated} />
//           <Route path="/preferences" element={<Preferences />} isAuthenticated={isAuthenticated} />

//           <PrivateRoute path="/dashboard" element={<Dashboard />} isAuthenticated={isAuthenticated}/>
//           <PrivateRoute path="/preferences" element={<Preferences />} isAuthenticated={isAuthenticated}/>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

import Login from "./components/Login";
import AdminProvider from "./context/AdminContext";


function App() {
  return (
    <div>
      <AdminProvider>
        <Login />
      </AdminProvider>
    </div>
  );
}

export default App
