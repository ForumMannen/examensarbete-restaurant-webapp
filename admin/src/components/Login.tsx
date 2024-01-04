import { useState } from "react";
import { useAdminContext } from "../context/AdminContext";

function Login(){
  const { fetchAdmin, loginAdmin } = useAdminContext();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetchAdmin({ email, password }); 
      setLoginSuccess(true);
    } catch (error) {
      console.error('Login failed:', error);
      setLoginSuccess(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Logga in</button>
        {loginSuccess && loginAdmin === true && <p>Login successful!</p>}
        {loginSuccess && loginAdmin === false && <p>Login failed!</p>}
    </form>
  )
}

export default Login








// interface LoginProps {
//   onLoginSuccess: () => void;
// }

// function Login({ onLoginSuccess }: LoginProps) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const response = await fetch ("/api/admin/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({email, password}),
//       })

//       if(response.ok){
//         // const data = await response.json();
//         onLoginSuccess();
//         console.log("Logged in!")
//       } else {
//         console.error("Login failed");
        
//       }
//     } catch (error) {
//       console.error("Error: ", error)
//     }
//   }