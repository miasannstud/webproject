// import InputField from "../InputField";
import { useState } from "react";
import { fetchLoginUser } from "../../services/authService";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await fetchLoginUser(formData);
      setSuccessMessage("Login successful!");
      setError(null);

      // store the token and userId
      localStorage.setItem("token", data.token);
      localStorage.setItem("researcherId", data.id);
      localStorage.setItem("firstName", data.firstName);

      // redirect after login
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      setError("An error happend. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <form onSubmit={handleLogin}>

      <div className="container">
        <label htmlFor="username"><b>Username</b></label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required />

        <label htmlFor="password"><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required />

        <button type="submit">Login</button>
      </div>

      <div className="container">
        <p>New here? <a data-testid="signup-link" href="/signup">Sign Up here !</a></p>
      </div>
    </form>
  );
}
