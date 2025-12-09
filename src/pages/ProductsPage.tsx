import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { getApiUrl } from '../config/api';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use the configured API URL
        const apiUrl = getApiUrl('products');
        console.log('Fetching from URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        console.log('Fetch response status:', response.status);
        console.log('Fetch response ok:', response.ok);
        
        const text = await response.text();
        console.log('Raw response text:', text);
        
        const data = JSON.parse(text);
        console.log('Parsed data:', data);
        
        // Check various possible response structures
        if (data.Data) {
          // Capital D (C# style)
          console.log('Found data in Data field');
          setProducts(data.Data);
        } else if (data.data) {
          // lowercase d
          console.log('Found data in data field');
          setProducts(data.data);
        } else if (Array.isArray(data)) {
          // Direct array
          console.log('Data is direct array');
          setProducts(data);
        } else {
          console.error('Unexpected data structure:', data);
          setError('Unexpected data structure from API');
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error fetching products: ' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>{error}</div>
        <button onClick={() => window.location.reload()} style={styles.retryButton}>
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.empty}>No products available</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Our Products</h1>
      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
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
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: '#1f2937',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.25rem',
    color: '#6b7280',
    padding: '3rem',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.25rem',
    color: '#ef4444',
    padding: '3rem',
  },
  retryButton: {
    display: 'block',
    margin: '1rem auto',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  empty: {
    textAlign: 'center',
    fontSize: '1.25rem',
    color: '#6b7280',
    padding: '3rem',
  },
};

export default ProductsPage;