import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { formatCurrency } from '../../utils/helpers';
import Button from '../ui/Button';
import './CartDrawer.css';

export default function CartDrawer({ onClose }) {
  const { cart, removeFromCart, updateQuantity, total, clearCart } =
    useContext(CartContext);

  const deliveryCharge = 4.99;
  const finalTotal = total + deliveryCharge;

  return (
    <>
      <div className="cart-drawer-overlay" onClick={onClose} />
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="cart-close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>🛍️</p>
            <h3>Your basket is waiting</h3>
            <p>for something delicious.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>

            <div className="cart-totals">
              <div className="cart-row">
                <span>Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="cart-row">
                <span>Delivery</span>
                <span>{formatCurrency(deliveryCharge)}</span>
              </div>
              <div className="cart-row cart-row-total">
                <span>Total</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <div className="cart-actions">
              <Button variant="primary" size="lg" className="cart-checkout-button">
                Proceed to Checkout
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={clearCart}
                className="cart-clear-button"
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="cart-item">
      <span className="cart-item-emoji">{item.image}</span>

      <div className="cart-item-info">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-price">${item.price.toFixed(2)} each</p>
      </div>

      <div className="cart-item-quantity">
        <button
          className="quantity-button"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          −
        </button>
        <span className="quantity-value">{item.quantity}</span>
        <button
          className="quantity-button"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>

      <span className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</span>

      <button
        className="cart-item-remove"
        onClick={() => onRemove(item.id)}
      >
        🗑️
      </button>
    </div>
  );
}
