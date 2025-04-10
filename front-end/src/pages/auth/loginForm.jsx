// import InputField from "../InputField";
import { useState } from "react";

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
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      setSuccessMessage("Login successful!");
      setError("");

      // Store the token and userId in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.id);

      window.location.href = "/dashboard";
  } else {
    setError(data.message || "Login failed.");
    setSuccessMessage("");
  }
} catch (error) {
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
            required/>
      
          <label htmlFor="password"><b>Password</b></label>
          <input 
            type="password" 
            placeholder="Enter Password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required/>
      
          <button type="submit">Login</button>
        </div>
      
        <div className="container">
          <p>New here? <a href="/signup">Sign Up here !</a></p>
        </div>
      </form> 
  );
}