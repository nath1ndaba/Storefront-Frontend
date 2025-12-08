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
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img
          src={product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={product.name}
          style={styles.image}
        />
        <span style={styles.category}>{getCategoryName(product.category)}</span>
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <div style={styles.footer}>
          <div style={styles.priceSection}>
            <span style={styles.price}>{formatCurrency(product.price)}</span>
            <span style={inStock ? styles.inStock : styles.outOfStock}>
              {inStock ? `${product.stockQuantity} in stock` : 'Out of stock'}
            </span>
          </div>
          {inStock && (
            <div style={styles.actions}>
              <input
                type="number"
                min="1"
                max={product.stockQuantity}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={styles.input}
                disabled={isAdding}
              />
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                style={isAdding ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
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
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  category: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.875rem',
  },
  content: {
    padding: '1rem',
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  description: {
    margin: '0 0 1rem 0',
    color: '#6b7280',
    fontSize: '0.875rem',
    lineHeight: '1.5',
  },
  footer: {
    marginTop: '1rem',
  },
  priceSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  inStock: {
    fontSize: '0.875rem',
    color: '#10b981',
    fontWeight: '500',
  },
  outOfStock: {
    fontSize: '0.875rem',
    color: '#ef4444',
    fontWeight: '500',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    width: '60px',
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    flex: 1,
    padding: '0.5rem 1rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },
};

export default ProductCard;