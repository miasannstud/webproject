import { useState } from "react";

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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
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
        setSuccessMessage(<p>Signup successful! <a data-testid="signup-redirectlogin" href="http://localhost:5173/">Please login here</a></p>);
        setError(null);
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          institution: "NTNU",
        });
      } else {
        setError(data.message || "Signup failed.");
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

          <button data-testid="signup-signupButton" type="submit">Signup</button>
        </div>
      </form>
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}
