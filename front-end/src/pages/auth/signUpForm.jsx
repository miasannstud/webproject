import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    institution: "NTNU",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSignup = async (event) => {
  event.preventDefault();
      // Frontend validation
  if (formData.username.length > 150) {
    setError("Username cannot exceed 150 characters.");
    return;
  }

  if (formData.password.length < 5) {
    setError("Password must be at least 5 characters long.");
    return;
  }

    try {
      const response = await fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Signup successful! Redirecting to login...'); 
        setError(null);
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          institution: "NTNU",
        });
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);

      } else {
        // Display all validation errors
        if (data.errors) {
          const errorMessages = data.errors.map((err) => `${err.path}: ${err.msg}`).join("\n");
          setError(errorMessages);
        } else {
          setError(data.message || "Signup failed.");
        }
        setSuccessMessage("");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="container">
          <label htmlFor="firstName"><b>First Name</b></label>
          <input
            type="text"
            placeholder="Enter First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName"><b>Last Name</b></label>
          <input
            type="text"
            placeholder="Enter Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor="username"><b>Username</b></label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email"><b>Email</b></label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password"><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="institution"><b>Institution</b></label>
          <select
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            required
          >
            <option value="NTNU">NTNU</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit">Signup</button>
        </div>
      </form>
      {error && <p className="errorMessage">{error}</p>}
      {successMessage && <p className="successMessage">{successMessage}</p>}    </div>
  );
}