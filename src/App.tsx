import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import './App.css';

function App() {
  return (
    <Router>
      <CartProvider>
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
          <Header />
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;