# Storefront Frontend

A modern, responsive e-commerce storefront built with React, TypeScript, and Vite. This frontend application provides a complete shopping experience with product browsing, cart management, and a clean, intuitive user interface.

![&Wider Logo](public/images/logo.png)

## 🚀 Features

- **Product Catalog**: Browse products with categories, pricing, and stock information
- **Shopping Cart**: Add, update, and remove items from cart
- **Session Management**: Persistent cart across browser sessions using localStorage
- **Responsive Design**: Beautiful UI that works on desktop, tablet, and mobile
- **Real-time Updates**: Cart quantities and totals update instantly
- **Modern Stack**: Built with React 19, TypeScript, and Vite

## 🛠️ Tech Stack

- **Framework**: React 19.2.1
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.7
- **Routing**: React Router DOM 7.10.1
- **HTTP Client**: Fetch API
- **Styling**: Inline styles with gradient effects

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js**: Version 20.19.0 or higher
- **npm**: Version 8.0.0 or higher
- **Backend API**: The Storefront API running (see backend repository)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Storefront-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   The project uses `.env` files for configuration:
   
   - `.env.development` - Local development (already configured)
   - `.env.production` - Production deployment (already configured)
   
   No changes needed unless you're using a different API URL.

## 🚦 Running the Application

### Development Mode

Run the application in development mode with hot-reload:

```bash
npm run dev
```

The application will start at `http://localhost:5173`

**Note**: In development mode, the app uses Vite's proxy to forward API requests to your local backend at `https://localhost:7164`.

### Production Build

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 🌐 Environment Configuration

### API Base URL

The application uses environment variables to configure the API endpoint:

**Development** (`.env.development`):
```bash
VITE_API_BASE_URL=
```
Empty value uses Vite proxy → `https://localhost:7164`

**Production** (`.env.production`):
```bash
VITE_API_BASE_URL=https://storefrontapi.onrender.com
```

### Switching Environments

The correct environment file is automatically selected:
- `npm run dev` → Uses `.env.development`
- `npm run build` → Uses `.env.production`

## 📁 Project Structure

```
Storefront-Frontend/
├── public/
│   └── images/
│       └── logo.png
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── ProductCard.tsx  # Product display card
│   │   └── CartItemCard.tsx # Cart item display
│   ├── context/             # React context providers
│   │   └── CartContext.tsx  # Cart state management
│   ├── pages/               # Page components
│   │   ├── ProductsPage.tsx # Products listing page
│   │   └── CartPage.tsx     # Shopping cart page
│   ├── services/            # API client
│   │   └── storefront-client.ts # Auto-generated API client
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   └── sessionId.ts     # Session and formatting utilities
│   ├── config/              # Configuration
│   │   └── api.ts           # API configuration
│   ├── App.tsx              # Main app component
│   ├── App.css              # Global styles
│   ├── main.tsx             # Application entry point
│   └── index.css            # Base styles
├── .env.development         # Development environment config
├── .env.production          # Production environment config
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies

```

## 🔌 API Integration

The frontend communicates with the backend API for:

- **GET /api/products** - Fetch all products
- **GET /api/cart?sessionId={id}** - Get user's cart
- **POST /api/cart** - Add item to cart
- **PATCH /api/cart/{itemId}?sessionId={id}** - Update cart item quantity
- **DELETE /api/cart/{itemId}** - Remove item from cart
- **DELETE /api/cart?sessionId={id}** - Clear entire cart

### API Client

The project uses an auto-generated TypeScript client (`storefront-client.ts`) created with NSwag from the backend's Swagger/OpenAPI specification.

## 🎨 Key Components

### CartContext
Manages global cart state and provides cart operations to all components:
- `cart` - Current cart data
- `addToCart()` - Add product to cart
- `updateCartItem()` - Update item quantity
- `removeFromCart()` - Remove item from cart
- `clearCart()` - Empty the cart
- `refreshCart()` - Reload cart from server

### ProductCard
Displays individual product information with:
- Product image, name, description
- Price and stock status
- Quantity selector
- Add to cart button

### CartItemCard
Shows cart item details with:
- Product image and name
- Unit price and subtotal
- Quantity controls (+/-)
- Remove button

### Header
Navigation component with:
- Logo and branding
- Cart icon with item count badge
- Navigation links

## 🔐 Session Management

The application uses `localStorage` to persist a unique session ID:

```typescript
// Automatically generated on first visit
sessionId: "session_abc123xyz"
```

This session ID is sent with all cart operations to maintain cart state across page refreshes and browser sessions.

## 🎯 Vite Proxy Configuration

For local development, Vite proxies API requests to the backend:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'https://localhost:7164',
      changeOrigin: true,
      secure: false, // Allow self-signed certificates
    }
  }
}
```

This prevents CORS issues during development.

## 🚀 Deployment

### Deploy to Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create New Web Service on Render**
   - Connect your GitHub repository
   - Set **Build Command**: `npm install && npm run build`
   - Set **Publish Directory**: `dist`
   - Add environment variable:
     - **Key**: `VITE_API_BASE_URL`
     - **Value**: `https://storefrontapi.onrender.com`

3. **Deploy**
   - Render will automatically build and deploy your application
   - Your app will be available at: `https://your-app-name.onrender.com`

### Deploy to Other Platforms

The application can be deployed to any static hosting service:
- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3 + CloudFront**: Upload `dist/` contents

## 🧪 Testing

### Manual Testing Checklist

- [ ] Products load and display correctly
- [ ] Add to cart functionality works
- [ ] Cart badge updates with item count
- [ ] Cart page shows all items
- [ ] Quantity can be increased/decreased
- [ ] Items can be removed from cart
- [ ] Cart totals calculate correctly
- [ ] Clear cart empties all items
- [ ] Session persists across page refreshes

## 🐛 Troubleshooting

### "Failed to fetch products"
- Ensure backend API is running
- Check `vite.config.ts` proxy configuration
- Verify backend CORS settings allow frontend origin

### "Cart not updating"
- Check browser console for errors
- Verify sessionId is being stored in localStorage
- Confirm backend API is responding (check Network tab)

### TypeScript errors with `import.meta.env`
- Ensure `src/vite-env.d.ts` exists with proper types
- Restart TypeScript server in VS Code: `Ctrl+Shift+P` → "Restart TS Server"

### Build errors
- Clear cache: `rm -rf node_modules dist`
- Reinstall: `npm install`
- Rebuild: `npm run build`

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the Storefront application suite.

## 🔗 Related Repositories

- **Backend API**: [Storefront API Repository]
- **Documentation**: [Project Documentation]

## 📞 Support

For issues and questions:
- Create an issue in the GitHub repository
- Contact the development team

---

Built with ❤️ using React + TypeScript + Vite
