import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { mockDeliveries } from '../../data/mockData';
import MelloraLogo from '../branding/MelloraLogo';
import './DriverDashboard.css';

export default function DriverDashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [deliveries, setDeliveries] = useState(mockDeliveries || []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleStatusChange = (id, newStatus) => {
    setDeliveries(
      deliveries.map((delivery) =>
        delivery.id === id ? { ...delivery, status: newStatus } : delivery
      )
    );
  };

  // Calculate summary metrics
  const completedDeliveries = deliveries.filter(
    (d) => d.status === 'Delivered'
  ).length;
  const pendingDeliveries = deliveries.filter(
    (d) => d.status === 'Pending' || d.status === 'Picked Up'
  ).length;
  const totalEarnings = 156.50; // Example earnings
  const totalDeliveries = deliveries.length;

  const statuses = ['Pending', 'Picked Up', 'Out for Delivery', 'Delivered'];

  return (
    <div className="driver-dashboard">
      {/* Header */}
      <header className="driver-header">
        <div className="driver-header-left">
          <MelloraLogo />
          <h1>Delivery Dashboard</h1>
        </div>
        <button className="driver-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="driver-container">
        {/* Summary Section */}
        <section className="driver-summary">
          <div className="driver-summary-card">
            <div className="driver-summary-icon">📦</div>
            <div className="driver-summary-content">
              <h3>Total Deliveries</h3>
              <p className="driver-summary-value">{totalDeliveries}</p>
            </div>
          </div>

          <div className="driver-summary-card">
            <div className="driver-summary-icon">✅</div>
            <div className="driver-summary-content">
              <h3>Completed</h3>
              <p className="driver-summary-value">{completedDeliveries}</p>
            </div>
          </div>

          <div className="driver-summary-card">
            <div className="driver-summary-icon">⏳</div>
            <div className="driver-summary-content">
              <h3>Pending</h3>
              <p className="driver-summary-value">{pendingDeliveries}</p>
            </div>
          </div>

          <div className="driver-summary-card">
            <div className="driver-summary-icon">💰</div>
            <div className="driver-summary-content">
              <h3>Earnings</h3>
              <p className="driver-summary-value">${totalEarnings.toFixed(2)}</p>
            </div>
          </div>
        </section>

        {/* Deliveries Section */}
        <main className="driver-main-content">
          <section className="driver-deliveries">
            <h2>Your Deliveries</h2>
            {deliveries.length === 0 ? (
              <div className="driver-empty-state">
                <p>No deliveries assigned yet</p>
              </div>
            ) : (
              <div className="driver-deliveries-grid">
                {deliveries.map((delivery) => (
                  <div key={delivery.id} className="driver-delivery-card">
                    <div className="driver-delivery-header">
                      <div className="driver-delivery-ids">
                        <span className="driver-delivery-id">{delivery.id}</span>
                        <span className="driver-order-id">{delivery.orderId}</span>
                      </div>
                      <span
                        className={`driver-delivery-status driver-status-${delivery.status
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`}
                      >
                        {delivery.status}
                      </span>
                    </div>

                    <div className="driver-delivery-details">
                      <div className="driver-detail-row">
                        <span className="driver-detail-label">Customer:</span>
                        <span className="driver-detail-value">
                          {delivery.customer}
                        </span>
                      </div>
                      <div className="driver-detail-row">
                        <span className="driver-detail-label">Address:</span>
                        <span className="driver-detail-value">
                          {delivery.address}
                        </span>
                      </div>
                      <div className="driver-detail-row">
                        <span className="driver-detail-label">Items:</span>
                        <span className="driver-detail-value">
                          {delivery.items.join(', ')}
                        </span>
                      </div>
                      <div className="driver-detail-row">
                        <span className="driver-detail-label">Time:</span>
                        <span className="driver-detail-value">
                          {delivery.time}
                        </span>
                      </div>
                    </div>

                    <div className="driver-delivery-actions">
                      <label className="driver-status-label">Update Status:</label>
                      <div className="driver-status-buttons">
                        {statuses.map((status) => (
                          <button
                            key={status}
                            className={`driver-status-btn ${
                              delivery.status === status ? 'active' : ''
                            }`}
                            onClick={() =>
                              handleStatusChange(delivery.id, status)
                            }
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
