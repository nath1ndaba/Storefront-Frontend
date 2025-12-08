# Storefront Application

A modern React + TypeScript e-commerce storefront application.

## Features

- 🛍️ Product listing and browsing
- 🛒 Shopping cart functionality
- 📱 Responsive design
- 🎨 Clean UI with inline styles
- 🔄 Real-time cart updates
- 💾 Session-based cart persistence

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running at https://storefrontapi.onrender.com

## Installation

This project was generated using the PowerShell generator script.
All dependencies are already installed.

## Running the Application

`ash
npm run dev
`

The application will open at http://localhost:5173

## Project Structure

`
src/
├── components/        # Reusable UI components
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── CartItemCard.tsx
├── pages/            # Page components
│   ├── ProductsPage.tsx
│   └── CartPage.tsx
├── context/          # React context providers
│   └── CartContext.tsx
├── hooks/            # Custom React hooks
├── services/         # API client services
│   └── storefront-client.ts
├── types/            # TypeScript type definitions
│   └── index.ts
├── utils/            # Utility functions
│   └── sessionId.ts
├── App.tsx           # Main App component
└── main.tsx          # Application entry point
`

## Available Scripts

- 
pm run dev - Start development server
- 
pm run build - Build for production
- 
pm run preview - Preview production build
- 
pm run lint - Run ESLint

## Backend API

The application connects to the backend API at:
https://storefrontapi.onrender.com

### API Endpoints Used

- GET /api/products - Fetch all products
- GET /api/cart?sessionId={id} - Get user's cart
- POST /api/cart - Add item to cart
- PATCH /api/cart/{itemId} - Update cart item quantity
- DELETE /api/cart/{itemId} - Remove item from cart
- DELETE /api/cart?sessionId={id} - Clear entire cart

## Architecture Decisions

### State Management
- Used React Context API for global cart state
- Centralized cart operations in CartContext
- Session-based cart using localStorage for persistence

### Styling
- Inline styles for simplicity and zero configuration
- Responsive design considerations
- No external CSS frameworks to minimize dependencies

### API Integration
- Leveraged auto-generated TypeScript client
- Type-safe API calls
- Proper error handling and loading states

### Component Structure
- Functional components with hooks
- Clear separation of concerns
- Reusable component design

## Usage

### Browsing Products
1. Navigate to the home page to see all products
2. Products display with image, name, description, price, and stock
3. Filter by category (future enhancement)

### Adding to Cart
1. Select quantity using the number input
2. Click "Add to Cart" button
3. Cart badge updates automatically in header

### Managing Cart
1. Click "Cart" in the header
2. Update quantities using +/- buttons
3. Remove items with "Remove" button
4. Clear entire cart with "Clear Cart" button
5. View order summary with totals

## Future Enhancements

- Product search and filtering
- Category navigation
- Product detail pages
- Checkout flow
- Order history
- User authentication
- Payment integration
- Product reviews
- Wishlist functionality

## Technologies Used

- React 18
- TypeScript
- Vite
- React Router DOM
- Native Fetch API

## Notes

- Cart data persists across sessions using sessionId
- Images fallback to placeholder if not available
- All currency formatted as USD
- Stock quantities enforced on frontend and backend

---

Generated with ❤️ for &Wider Full-Stack Challenge
