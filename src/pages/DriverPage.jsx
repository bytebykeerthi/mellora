import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import DriverDashboard from '../components/driver/DriverDashboard';
import './DriverPage.css';

export default function DriverPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.isAuthenticated || auth.role !== 'driver') {
      navigate('/');
    }
  }, [auth, navigate]);

  if (!auth.isAuthenticated || auth.role !== 'driver') {
    return null;
  }

  return (
    <div className="driver-page">
      <DriverDashboard />
    </div>
  );
}
