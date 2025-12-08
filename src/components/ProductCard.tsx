import React, { useState } from 'react';
import { Product } from '../types';
import { formatCurrency, getCategoryName } from '../utils/sessionId';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (product.id) {
      setIsAdding(true);
      try {
        await addToCart(product.id, quantity);
        setQuantity(1);
      } catch (error) {
        console.error('Error adding to cart:', error);
      } finally {
        setIsAdding(false);
      }
    }
  };

  const inStock = (product.stockQuantity ?? 0) > 0;

  return (
    <div 
      style={{
        ...styles.card,
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 12px 20px -5px rgba(0, 0, 0, 0.1), 0 6px 8px -3px rgba(0, 0, 0, 0.04)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageContainer}>
        <img
          src={product.imageUrl || 'https://via.placeholder.com/300x180?text=No+Image'}
          alt={product.name}
          style={styles.image}
        />
        <div style={styles.overlay}>
          <span style={styles.category}>
            {getCategoryName(product.category)}
          </span>
        </div>
      </div>
      
      <div style={styles.content}>
        <div style={styles.header}>
          <h3 style={styles.title}>{product.name}</h3>
          <div style={styles.stockBadge}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            <span style={styles.stockText}>
              {inStock ? `${product.stockQuantity} left` : 'Out'}
            </span>
          </div>
        </div>
        
        <p style={styles.description}>{product.description}</p>
        
        <div style={styles.footer}>
          <div style={styles.priceSection}>
            <span style={styles.price}>{formatCurrency(product.price)}</span>
            <span style={inStock ? styles.inStock : styles.outOfStock}>
              {inStock ? '✓ In Stock' : '✗ Out'}
            </span>
          </div>
          
          {inStock && (
            <div style={styles.actions}>
              <div style={styles.quantityControl}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={styles.quantityButton}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span style={styles.quantity}>{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockQuantity!, quantity + 1))}
                  style={styles.quantityButton}
                  disabled={quantity >= (product.stockQuantity || 0)}
                >
                  +
                </button>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                style={isAdding ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid #e5e7eb',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '180px',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  category: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '16px',
    fontSize: '0.7rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  content: {
    padding: '1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5rem',
    gap: '0.5rem',
  },
  title: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#111827',
    lineHeight: '1.3',
    flex: 1,
  },
  stockBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    backgroundColor: '#f3f4f6',
    padding: '3px 8px',
    borderRadius: '10px',
    flexShrink: 0,
  },
  stockText: {
    fontSize: '0.7rem',
    color: '#6b7280',
    fontWeight: '500',
  },
  description: {
    margin: '0 0 0.875rem 0',
    color: '#6b7280',
    fontSize: '0.8rem',
    lineHeight: '1.4',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  } as React.CSSProperties,
  footer: {
    marginTop: '0.75rem',
  },
  priceSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #e5e7eb',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } as React.CSSProperties,
  inStock: {
    fontSize: '0.8rem',
    color: '#10b981',
    fontWeight: '600',
  },
  outOfStock: {
    fontSize: '0.8rem',
    color: '#ef4444',
    fontWeight: '600',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.625rem',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    padding: '0.375rem',
    borderRadius: '8px',
  },
  quantityButton: {
    width: '30px',
    height: '30px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    color: '#374151',
  },
  quantity: {
    minWidth: '35px',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: '700',
    color: '#111827',
  },
  button: {
    width: '100%',
    padding: '0.75rem 1.25rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: '0 4px 6px rgba(102, 126, 234, 0.3)',
  },
  buttonDisabled: {
    background: '#9ca3af',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
};

export default ProductCard;