import { useState } from 'react';
import { validateEmail, validatePassword } from '../../utils/helpers';
import Input from '../ui/Input';
import Button from '../ui/Button';
import MelloraLogo from '../branding/MelloraLogo';
import './LoginPanel.css';

export default function LoginPanel({ role, onBack, onSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    reason: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSuccess(role);
    }, 1000);
  };

  const roleTitle = role === 'admin' ? 'Admin' : 'Driver';
  const roleSubtitle =
    role === 'admin' ? 'Mellora Administration' : 'Delivery Partner';

  return (
    <div className="login-panel">
      <div className="login-background">
        <div className="login-gradient" />
      </div>

      <div className="login-content">
        {/* Header */}
        <div className="login-header">
          <button className="login-back-button" onClick={onBack}>
            ← Back
          </button>
          <MelloraLogo size="sm" showText={false} />
        </div>

        {/* Form Container */}
        <div className="login-form-container">
          <div className="login-title-section">
            <h1 className="login-title">{roleTitle} Login</h1>
            <p className="login-subtitle">{roleSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <Input
              label="Username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              disabled={loading}
            />

            <Input
              label="Email ID"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={loading}
            />

            <div className="password-wrapper">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>

            <Input
              label="Reason for choosing this role"
              type="text"
              name="reason"
              placeholder="Your reason (optional)"
              value={formData.reason}
              onChange={handleChange}
              disabled={loading}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="login-submit-button"
            >
              {loading ? 'Logging in...' : `Continue as ${roleTitle}`}
            </Button>
          </form>

          <p className="login-disclaimer">
            This is a frontend prototype. No actual credentials are stored.
          </p>
        </div>
      </div>
    </div>
  );
}
