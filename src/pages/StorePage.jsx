import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { products, categories } from '../data/mockData';
import StoreHeader from '../components/store/StoreHeader';
import CategoryFilter from '../components/store/CategoryFilter';
import ProductGrid from '../components/store/ProductGrid';
import CartDrawer from '../components/store/CartDrawer';
import './StorePage.css';

export default function StorePage() {
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);
  const { cart, itemCount } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);

  if (!auth.isAuthenticated) {
    navigate('/');
    return null;
  }

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === 'all' ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="store-page">
      <StoreHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={itemCount}
        onCartClick={() => setShowCart(!showCart)}
        onLogout={handleLogout}
      />

      <div className="store-main">
        <aside className="store-sidebar">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </aside>

        <main className="store-content">
          {filteredProducts.length === 0 ? (
            <div className="store-empty-state">
              <h2>Nothing fresh here yet.</h2>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </main>
      </div>

      {showCart && <CartDrawer onClose={() => setShowCart(false)} />}
    </div>
  );
}
