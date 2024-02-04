import { useEffect, useState } from "react";
import { useAdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginAdmin, isAdmin, authAdmin } = useAdminContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    authAdmin();
  }, [])

  //If already logged in redirect to dashboard
  useEffect(() => {
    console.log(isAdmin);

    if (isAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const admin = { email, password };
      const response = await loginAdmin(admin);
      if (typeof response === "string" &&
        response === "Wrong email or password!") {
        setLogin(false);
      } else {
        setLogin(true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  useEffect(() => {
    if (!isAdmin) {
      setLogin(false);
    }
  }, [isAdmin])

  //Navigate to dashboard if login succeeds
  useEffect(() => {
    if (login) {
      console.log("login?", login);

      navigate("/dashboard");
    }
  }, [login, navigate])

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Logga in</button>
    </form>
  )
}

export default Login