import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { mockOrders, mockDrivers } from '../../data/mockData';
import MelloraLogo from '../branding/MelloraLogo';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Calculate dashboard metrics
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const activeCustomers = mockOrders.length;
  const activeDrivers = mockDrivers.filter(d => d.status === 'Active').length;

  const navItems = [
    { label: 'Dashboard', icon: '📊' },
    { label: 'Products', icon: '📦' },
    { label: 'Orders', icon: '📋' },
    { label: 'Customers', icon: '👥' },
    { label: 'Drivers', icon: '🚗' },
    { label: 'Analytics', icon: '📈' },
    { label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-left">
          <MelloraLogo />
          <h1>Admin Dashboard</h1>
        </div>
        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="admin-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            {navItems.map((item, index) => (
              <div
                key={index}
                className={`admin-nav-item ${index === 0 ? 'active' : ''}`}
              >
                <span className="admin-nav-icon">{item.icon}</span>
                <span className="admin-nav-label">{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-main-content">
          {/* Welcome Section */}
          <section className="admin-welcome">
            <h2>Welcome Back</h2>
            <p>Here's what's happening with your business today</p>
          </section>

          {/* Dashboard Cards */}
          <section className="admin-cards-grid">
            <div className="admin-card">
              <div className="admin-card-header">
                <span className="admin-card-icon">📋</span>
                <span className="admin-card-title">Total Orders</span>
              </div>
              <div className="admin-card-value">{totalOrders}</div>
              <div className="admin-card-footer">
                <span className="admin-card-change">+3 this week</span>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-header">
                <span className="admin-card-icon">💰</span>
                <span className="admin-card-title">Total Revenue</span>
              </div>
              <div className="admin-card-value">${totalRevenue.toFixed(2)}</div>
              <div className="admin-card-footer">
                <span className="admin-card-change">+$120 this week</span>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-header">
                <span className="admin-card-icon">👥</span>
                <span className="admin-card-title">Active Customers</span>
              </div>
              <div className="admin-card-value">{activeCustomers}</div>
              <div className="admin-card-footer">
                <span className="admin-card-change">+1 today</span>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-header">
                <span className="admin-card-icon">🚗</span>
                <span className="admin-card-title">Active Drivers</span>
              </div>
              <div className="admin-card-value">{activeDrivers}</div>
              <div className="admin-card-footer">
                <span className="admin-card-change status-active">Online</span>
              </div>
            </div>
          </section>

          {/* Recent Orders Section */}
          <section className="admin-recent-orders">
            <h3>Recent Orders</h3>
            <div className="admin-orders-table">
              <div className="admin-orders-header">
                <div className="admin-orders-col">Order ID</div>
                <div className="admin-orders-col">Customer</div>
                <div className="admin-orders-col">Items</div>
                <div className="admin-orders-col">Total</div>
                <div className="admin-orders-col">Status</div>
              </div>
              {mockOrders.map((order) => (
                <div key={order.id} className="admin-orders-row">
                  <div className="admin-orders-col">{order.id}</div>
                  <div className="admin-orders-col">{order.customer}</div>
                  <div className="admin-orders-col">{order.items}</div>
                  <div className="admin-orders-col">${order.total.toFixed(2)}</div>
                  <div className="admin-orders-col">
                    <span className={`admin-status admin-status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
