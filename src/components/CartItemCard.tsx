import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatCurrency } from '../utils/sessionId';
import { useCart } from '../context/CartContext';

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (!item.id) {
      console.error('Cart item has no ID:', item);
      alert('Cannot update item: missing ID. Please refresh the page.');
      return;
    }
    
    if (newQuantity > 0) {
      setIsUpdating(true);
      try {
        await updateCartItem(item.id, newQuantity);
      } catch (error) {
        console.error('Error updating quantity:', error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleRemove = async () => {
    if (!item.id) {
      console.error('Cart item has no ID:', item);
      alert('Cannot remove item: missing ID. Please refresh the page.');
      return;
    }
    
    setIsRemoving(true);
    try {
      await removeFromCart(item.id);
    } catch (error) {
      console.error('Error removing item:', error);
      setIsRemoving(false);
    }
  };

  return (
    <div 
      style={{
        ...styles.card,
        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageContainer}>
        <img
          src={item.productImageUrl || 'https://via.placeholder.com/120?text=No+Image'}
          alt={item.productName}
          style={styles.image}
        />
        <div style={styles.imageBadge}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>
      </div>
      
      <div style={styles.content}>
        <div style={styles.info}>
          <h3 style={styles.title}>{item.productName}</h3>
          <p style={styles.price}>{formatCurrency(item.unitPrice)} each</p>
        </div>
        
        <div style={styles.actions}>
          <div style={styles.quantityControl}>
            <button
              onClick={() => handleUpdateQuantity((item.quantity || 1) - 1)}
              disabled={isUpdating || (item.quantity || 1) <= 1}
              style={{
                ...styles.quantityButton,
                ...(isUpdating || (item.quantity || 1) <= 1 ? styles.buttonDisabled : {})
              }}
            >
              −
            </button>
            <div style={styles.quantityBox}>
              <span style={styles.quantity}>{item.quantity}</span>
              <span style={styles.quantityLabel}>qty</span>
            </div>
            <button
              onClick={() => handleUpdateQuantity((item.quantity || 1) + 1)}
              disabled={isUpdating}
              style={{
                ...styles.quantityButton,
                ...(isUpdating ? styles.buttonDisabled : {})
              }}
            >
              +
            </button>
          </div>
          
          <div style={styles.priceSection}>
            <span style={styles.subtotalLabel}>Subtotal</span>
            <span style={styles.subtotal}>{formatCurrency(item.subtotal)}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleRemove}
        disabled={isRemoving}
        style={{
          ...styles.removeButton,
          ...(isRemoving ? styles.removeButtonDisabled : {})
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'flex',
    gap: '1.25rem',
    padding: '1.25rem',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    border: '1px solid #e5e7eb',
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    flexShrink: 0,
  },
  image: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '12px',
    border: '2px solid #f3f4f6',
  },
  imageBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#667eea',
    color: 'white',
    padding: '6px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    minWidth: 0,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#111827',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  price: {
    margin: 0,
    color: '#6b7280',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  actions: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: '#f9fafb',
    padding: '0.5rem',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  quantityButton: {
    width: '36px',
    height: '36px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    color: '#374151',
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  quantityBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '48px',
    gap: '2px',
  },
  quantity: {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#111827',
  },
  quantityLabel: {
    fontSize: '0.625rem',
    color: '#9ca3af',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  priceSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    alignItems: 'flex-start',
  },
  subtotalLabel: {
    fontSize: '0.75rem',
    color: '#6b7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  subtotal: {
    fontSize: '1.5rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } as React.CSSProperties,
  removeButton: {
    padding: '0.75rem',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    flexShrink: 0,
    alignSelf: 'flex-start',
  },
  removeButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  buttonDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
};

export default CartItemCard;