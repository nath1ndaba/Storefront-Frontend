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
  
  // Debug: Log the item structure
  console.log('CartItemCard item:', item);
  console.log('Item ID:', item.id, 'Type:', typeof item.id);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (!item.id) {
      console.error('Cart item has no ID:', item);
      alert('Cannot update item: missing ID. Please refresh the page.');
      return;
    }
    
    if (newQuantity > 0) {
      setIsUpdating(true);
      try {
        console.log('Updating cart item:', item.id, 'to quantity:', newQuantity);
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
      console.log('Removing cart item:', item.id);
      await removeFromCart(item.id);
    } catch (error) {
      console.error('Error removing item:', error);
      setIsRemoving(false);
    }
  };

  return (
    <div style={styles.card}>
      <img
        src={item.productImageUrl || 'https://via.placeholder.com/100?text=No+Image'}
        alt={item.productName}
        style={styles.image}
      />
      <div style={styles.content}>
        <h3 style={styles.title}>{item.productName}</h3>
        <p style={styles.price}>{formatCurrency(item.unitPrice)}</p>
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
            -
          </button>
          <span style={styles.quantity}>{item.quantity}</span>
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
        <p style={styles.subtotal}>{formatCurrency(item.subtotal)}</p>
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          style={{
            ...styles.removeButton,
            ...(isRemoving ? styles.buttonDisabled : {})
          }}
        >
          {isRemoving ? 'Removing...' : 'Remove'}
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    alignItems: 'center',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  content: {
    flex: 1,
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  price: {
    margin: 0,
    color: '#6b7280',
    fontSize: '0.875rem',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    alignItems: 'flex-end',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  quantityButton: {
    width: '32px',
    height: '32px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  quantity: {
    minWidth: '30px',
    textAlign: 'center',
    fontSize: '1rem',
  },
  subtotal: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  removeButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

export default CartItemCard;