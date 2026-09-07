import { useState } from "react";
import { signupUser } from "./api/auth";
import AuthBrand from "./AuthBrand";
import { FacebookIcon, GoogleIcon, LockIcon } from "./AuthIcons";
import "./Auth.css";

const SignUp = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await signupUser(formData);
      setSuccess(data.message);
      setFormData({ name: "", email: "", city: "", password: "" });
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

          <h2>Create Account</h2>

          <div className="social-buttons">
            <button type="button" className="social-btn">
              <GoogleIcon />
              Signup with Google
            </button>
            <button type="button" className="social-btn">
              <FacebookIcon />
              Signup with Facebook
            </button>
          </div>

          <div className="divider">OR</div>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field-group">
              <label htmlFor="name">Full Name</label>
              <div className="field-input-wrap">
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

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
              <label htmlFor="city">City</label>
              <div className="field-input-wrap">
                <input
                  id="city"
                  type="text"
                  name="city"
                  placeholder="Your city"
                  value={formData.city}
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
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{" "}
            <button type="button" className="link-btn" onClick={onLogin}>
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
