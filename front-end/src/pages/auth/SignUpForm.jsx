import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSignupUser } from "../../services/authService";
import "./SignupForm.css";

const FRONTEND_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8186/"
    : "https://group6.sustainability.it.ntnu.no/";

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

    try {
      const data = await fetchSignupUser(formData);

        setSuccessMessage(<p>Signup successful! <a data-testid="signup-redirectlogin" href={`${FRONTEND_BASE_URL}`}>Please login here</a></p>);
        setError(null);
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          institution: "NTNU",
        });
      
      // redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message || "An error occurred. Please try again.");
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

          <button data-testid="signup-signupButton" type="submit">Signup</button>
        </div>
      </form>
      {error && <div className="error errorMessage">{error}</div>}
      {successMessage && <div className="successMessage">{successMessage}</div>}
    </div>
  );
}
