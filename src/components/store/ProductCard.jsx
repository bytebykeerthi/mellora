import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Button from '../ui/Button';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <span className="product-emoji">{product.image}</span>
      </div>

      <div className="product-info">
        <div className="product-header">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>
        </div>

        <div className="product-pricing">
          <span className="product-price">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="product-old-price">${product.oldPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="product-rating">
          <span className="stars">⭐ {product.rating}</span>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleAddToCart}
          className="product-button"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
