import React from 'react';
import { useCart } from '../context/CartContext';
import CartItemCard from '../components/CartItemCard';
import { formatCurrency } from '../utils/sessionId';

const CartPage: React.FC = () => {
  const { cart, loading, clearCart } = useCart();

  if (loading && !cart) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading cart...</div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.empty}>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Shopping Cart</h1>
        <button onClick={clearCart} style={styles.clearButton}>
          Clear Cart
        </button>
      </div>
      <div style={styles.content}>
        <div style={styles.items}>
          {cart.items.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>
        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>
          <div style={styles.summaryRow}>
            <span>Total Items:</span>
            <span style={styles.summaryValue}>{cart.totalItems}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Total Amount:</span>
            <span style={styles.summaryTotal}>{formatCurrency(cart.totalAmount)}</span>
          </div>
          <button style={styles.checkoutButton}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  clearButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  summary: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    height: 'fit-content',
    position: 'sticky',
    top: '1rem',
  },
  summaryTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.75rem',
    fontSize: '1rem',
  },
  summaryValue: {
    fontWeight: '500',
  },
  summaryTotal: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  checkoutButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.25rem',
    color: '#6b7280',
    padding: '3rem',
  },
  empty: {
    textAlign: 'center',
    padding: '3rem',
    color: '#6b7280',
  },
};

export default CartPage;