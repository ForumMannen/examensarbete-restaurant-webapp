import { useEffect, useState } from "react";
import { useAdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

function Login(){
  const { fetchAdmin, loginAdmin } = useAdminContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if(loginAdmin){
      navigate("/dashboard")
    }
  }, [loginAdmin])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetchAdmin({ email, password });
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Logga in</button>
    </form>
  )
}

export default Login