import { useState } from "react"

interface LoginProps {
  onLoginSuccess: () => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch ("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      })

      if(response.ok){
        // const data = await response.json();
        onLoginSuccess();
        console.log("Logged in!")
      } else {
        console.error("Login failed");
        
      }
    } catch (error) {
      console.error("Error: ", error)
    }
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleLogin();
    }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Logga in</button>
    </form>
  )
}

export default Login