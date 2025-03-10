import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "../styles/forgot-password.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Token received:", token);
  }, [token]);

  // Password validation function
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8)
      errors.push("Password must be at least 8 characters.");
    if (!/[A-Z]/.test(password))
      errors.push("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password))
      errors.push("Password must contain at least one lowercase letter.");
    if (!/[0-9]/.test(password))
      errors.push("Password must contain at least one number.");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push("Password must contain at least one special character.");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors([]);

    const validationErrors = validatePassword(password);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      validationErrors.forEach((err) => toast.error(err));
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      toast.success("✅ Password reset successful! You can now log in.");
      setMessage("Password reset successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(
        error.message || "❌ Something went wrong. Please try again."
      );
      setMessage(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="f-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="f-form">
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="reset-btn" type="submit">
          Reset Password
        </button>
      </form>

      {errors.length > 0 && (
        <ul className="error-list">
          {errors.map((error, index) => (
            <li key={index} className="error-text">
              {error}
            </li>
          ))}
        </ul>
      )}

      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default ResetPassword;
