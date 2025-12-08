import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { cart } = useCart();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <h1 style={styles.logoText}>🛍️ Storefront</h1>
        </Link>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Products</Link>
          <Link to="/cart" style={styles.link}>
            Cart {cart?.totalItems ? <span style={styles.badge}>({cart.totalItems})</span> : null}
          </Link>
        </nav>
      </div>
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    textDecoration: 'none',
    color: 'white',
  },
  logoText: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
  badge: {
    backgroundColor: '#ef4444',
    borderRadius: '12px',
    padding: '2px 8px',
    fontSize: '0.875rem',
    marginLeft: '0.5rem',
  },
};

export default Header;