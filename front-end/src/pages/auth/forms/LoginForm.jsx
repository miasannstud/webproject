// import InputField from "../InputField";
import { useState } from "react";
import { fetchLoginUser } from "../../../services/authService";
import styles from "./forms.module.css";

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

      // store the token and researchId
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
    <div className={styles.authFormCont}>
      <h1 className={styles.authTitle}>Welcome to Grade A+</h1>
      <h2 className={styles.authSubTitle}>Login</h2>

      <form className={styles.authForm} onSubmit={handleLogin}>
        <div className={styles.authItem}>
          <label className={styles.authLabel} htmlFor="username"><b>Username</b></label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required />
        </div>

        <div className={styles.authItem}>
          <label className={styles.authLabel} htmlFor="password"><b>Password</b></label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required />
        </div>

          <button className={styles.signupButton} type="submit">Login</button>

          {error && <div className={styles.errorMessage}>{error}</div>}
          {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

        <div className={styles.container}>
          <p>New here? <a data-testid="signup-link" href="/signup">Sign Up here !</a></p>
        </div>
      </form>
  </div>
  );
}
