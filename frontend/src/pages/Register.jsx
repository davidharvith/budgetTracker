import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrors([]);
    try {
      await API.post("/api/register", form);
      navigate("/");
    } catch (err) {
      // If backend returns a list of errors
      if (Array.isArray(err.response?.data?.errors)) {
        setErrors(err.response.data.errors);
      } else {
        setError(
          err.response?.data?.message || "Registration failed. Please try again."
        );
      }
    }
  };


  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="register-input"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            className="register-input"
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="register-input"
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button className="register-button" type="submit">
            Register
          </button>
        </form>
        {error && <p className="register-error">{error}</p>}
        {errors.length > 0 && (
          <ul className="register-error-list">
            {errors.map((errMsg, idx) => (
              <li key={idx}>{errMsg}</li>
            ))}
          </ul>
        )}
        <div className="register-login">
          <span>Already have an account? </span>
          <Link to="/">Click here to login!</Link>
        </div>
      </div>
    </div>
  );
}
