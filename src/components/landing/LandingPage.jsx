import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import MelloraLogo from '../branding/MelloraLogo';
import Flower from '../branding/Flower';
import Button from '../ui/Button';
import LoginPanel from '../auth/LoginPanel';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleGuestClick = () => {
    login('guest', { name: 'Guest User' });
    navigate('/store');
  };

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setShowLogin(true);
  };

  const handleBackFromLogin = () => {
    setShowLogin(false);
    setSelectedRole(null);
  };

  const handleLoginSuccess = (role) => {
    navigate(role === 'admin' ? '/admin' : '/driver');
  };

  if (showLogin && selectedRole) {
    return (
      <LoginPanel
        role={selectedRole}
        onBack={handleBackFromLogin}
        onSuccess={handleLoginSuccess}
      />
    );
  }

  return (
    <div className="landing-page">
      <div className="landing-background">
        <div className="landing-gradient" />
        <div className="landing-glow" />
      </div>

      <div className="landing-content">
        {/* Header */}
        <div className="landing-header">
          <MelloraLogo size="md" showText={true} />
        </div>

        {/* Hero Section */}
        <div className="landing-hero">
          <h1 className="landing-title">Fresh choices. Simple living.</h1>
          <p className="landing-subtitle">
            Discover fresh products, effortless shopping, and a better way to bring everyday goodness home.
          </p>
          <div className="landing-flower">
            <Flower size="md" />
          </div>
        </div>

        {/* Role Selector Cards */}
        <div className="role-selector">
          <RoleCard
            title="Guest"
            subtitle="Explore Mellora"
            description="Browse products and explore the store without creating an account."
            buttonLabel="Continue as Guest"
            onPrimary={handleGuestClick}
            icon="🛍️"
            color="pink"
          />

          <RoleCard
            title="Driver"
            subtitle="Delivery Partner"
            description="Access your delivery and order-management workspace."
            buttonLabel="Driver Login"
            onPrimary={() => handleRoleClick('driver')}
            icon="🚗"
            color="green"
          />

          <RoleCard
            title="Admin"
            subtitle="Mellora Administration"
            description="Manage products, orders, users, and platform operations."
            buttonLabel="Admin Login"
            onPrimary={() => handleRoleClick('admin')}
            icon="⚙️"
            color="orange"
          />
        </div>

        {/* Footer */}
        <div className="landing-footer">
          <p>Mellora © 2024 • Fresh from nature to you</p>
        </div>
      </div>
    </div>
  );
}

function RoleCard({
  title,
  subtitle,
  description,
  buttonLabel,
  onPrimary,
  icon,
  color,
}) {
  return (
    <div className={`role-card role-card-${color}`}>
      <div className="role-card-icon">{icon}</div>
      <h3 className="role-card-title">{title}</h3>
      <p className="role-card-subtitle">{subtitle}</p>
      <p className="role-card-description">{description}</p>
      <Button
        variant="primary"
        size="md"
        onClick={onPrimary}
        className="role-card-button"
      >
        {buttonLabel}
      </Button>
    </div>
  );
}
