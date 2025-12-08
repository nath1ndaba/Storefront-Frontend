import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { cart } = useCart();

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <img 
            src="/images/logo.png" 
            alt="&Wider Logo" 
            style={styles.logoImage}
          />
          <h1 style={styles.logoText}>Storefront</h1>
        </Link>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>
            <span style={styles.linkText}>Products</span>
          </Link>
          <Link to="/cart" style={styles.cartLink}>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span style={styles.linkText}>Cart</span>
            {cart?.totalItems ? (
              <span style={styles.badge}>{cart.totalItems}</span>
            ) : null}
          </Link>
        </nav>
      </div>
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '1rem 0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
    color: 'white',
    transition: 'transform 0.2s ease',
  },
  logoImage: {
    height: '40px',
    width: 'auto',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
  },
  logoText: {
    margin: 0,
    fontSize: '1.75rem',
    fontWeight: '700',
    letterSpacing: '-0.025em',
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
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  linkText: {
    display: 'inline-block',
  },
  cartLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    position: 'relative',
  },
  badge: {
    backgroundColor: '#ef4444',
    borderRadius: '999px',
    padding: '2px 8px',
    fontSize: '0.75rem',
    fontWeight: '700',
    minWidth: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
};

export default Header;