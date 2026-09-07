import { useState } from "react";
import { loginUser } from "./api/auth";
import AuthBrand from "./AuthBrand";
import { FacebookIcon, GoogleIcon, LockIcon } from "./AuthIcons";
import "./Auth.css";

const Login = ({ onSignUp, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser(formData);
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <AuthBrand />

        <div className="auth-form-panel">
          <div className="form-top-bar">
            <select className="lang-select" defaultValue="en-uk" aria-label="Language">
              <option value="en-uk">English (UK)</option>
              <option value="en-us">English (US)</option>
            </select>
          </div>

          <h2>Welcome Back</h2>

          <div className="social-buttons">
            <button type="button" className="social-btn">
              <GoogleIcon />
              Login with Google
            </button>
            <button type="button" className="social-btn">
              <FacebookIcon />
              Login with Facebook
            </button>
          </div>

          <div className="divider">OR</div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="email">Email</label>
              <div className="field-input-wrap">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <div className="field-input-wrap">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span className="field-icon">
                  <LockIcon />
                </span>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <a href="/" className="forgot-link">
            Forgot Password?
          </a>

          <p className="auth-footer">
            Don't have an account?{" "}
            <button type="button" className="link-btn" onClick={onSignUp}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
