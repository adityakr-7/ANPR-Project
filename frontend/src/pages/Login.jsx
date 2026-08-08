import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">

      <div className="background-glow glow1"></div>
      <div className="background-glow glow2"></div>

      <div className="login-card">

        <h1>ANPR SYSTEM</h1>

        <p>Automatic Number Plate Recognition</p>

        <input
          type="email"
          placeholder="Email Address"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button
          onClick={() => navigate("/dashboard")}
        >
          Sign In
        </button>

      </div>

    </div>
  );
}

export default Login;