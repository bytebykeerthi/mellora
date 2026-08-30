import MelloraLogo from '../branding/MelloraLogo';
import Button from '../ui/Button';
import Input from '../ui/Input';
import './StoreHeader.css';

export default function StoreHeader({
  searchQuery,
  onSearchChange,
  cartCount,
  onCartClick,
  onLogout,
}) {
  return (
    <header className="store-header">
      <div className="store-header-content">
        <MelloraLogo size="sm" showText={false} />

        <div className="store-search">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="store-header-actions">
          <button className="store-cart-button" onClick={onCartClick}>
            🛒 Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <Button variant="ghost" size="sm" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
