import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import './AdminPage.css';

export default function AdminPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.isAuthenticated || auth.role !== 'admin') {
      navigate('/');
    }
  }, [auth, navigate]);

  if (!auth.isAuthenticated || auth.role !== 'admin') {
    return null;
  }

  return (
    <div className="admin-page">
      <AdminDashboard />
    </div>
  );
}
