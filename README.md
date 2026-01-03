# E-Commerce Website

A responsive e-commerce website built with HTML, CSS, and Vanilla JavaScript. This project demonstrates a complete shopping experience with product management, search, filtering, and shopping cart functionality using LocalStorage for data persistence.

## Features

### 🛍️ Product Listing Page
- **Product Grid Display**: Beautiful product cards showing image, name, price, and category
- **Search Functionality**: Real-time search to find products by name
- **Category Filter**: Filter products by category (Electronics, Clothing, Books, etc.)
- **Add to Cart**: Easy one-click add to cart functionality
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 👨‍💼 Admin Panel
- **Add Products**: Create new products with name, price, category, image URL, and description
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products from the store
- **Form Validation**: Ensures all required fields are filled correctly
- **Modal Interface**: Clean modal dialog for adding/editing products

### 🛒 Shopping Cart
- **Cart Management**: View all items in your cart
- **Quantity Updates**: Change quantities directly in the cart
- **Remove Items**: Remove individual items from the cart
- **Total Calculation**: Automatic calculation of cart total
- **Clear Cart**: Option to clear all items at once
- **Checkout Demo**: Simulated checkout process (alert for demo purposes)

### 💾 Data Persistence
- **LocalStorage**: All products and cart data are saved in browser LocalStorage
- **No Backend Required**: Fully functional without a server
- **Sample Data**: Pre-loaded with sample products for immediate testing

## Project Structure

```
E-comm/
├── index.html          # Product listing page (main page)
├── admin.html          # Admin panel page
├── cart.html           # Shopping cart page
├── css/
│   └── style.css       # All styles (shared across pages)
├── js/
│   ├── products.js     # Product data management & LocalStorage operations
│   ├── main.js         # Product listing page logic
│   ├── admin.js        # Admin panel logic
│   ├── cart.js         # Cart operations (shared functions)
│   └── cart-page.js    # Cart page display logic
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required!

### Installation

1. **Clone or download** this repository to your computer

2. **Open the project folder** in your file explorer

3. **Open `index.html`** in your web browser:
   - Option 1: Double-click `index.html`
   - Option 2: Right-click `index.html` → "Open with" → Choose your browser
   - Option 3: Drag `index.html` into an open browser window

That's it! The website is ready to use.

## Usage Guide

### As a Customer

1. **Browse Products**: View all available products on the main page
2. **Search**: Type in the search box to find specific products
3. **Filter**: Select a category from the dropdown to filter products
4. **Add to Cart**: Click "Add to Cart" button on any product card
5. **View Cart**: Click "Cart" in the navigation (shows item count badge)
6. **Manage Cart**: 
   - Change quantities using the number input
   - Remove items using the × button
   - Clear entire cart if needed
7. **Checkout**: Click "Checkout" button (demo alert for demonstration)

### As an Admin

1. **Navigate to Admin Panel**: Click "Admin" in the navigation
2. **Add Product**: 
   - Click "Add New Product" button
   - Fill in the form (name, price, category, image URL, description)
   - Click "Save Product"
3. **Edit Product**:
   - Click "Edit" button next to any product
   - Modify the fields in the form
   - Click "Save Product"
4. **Delete Product**:
   - Click "Delete" button next to any product
   - Confirm deletion in the popup

## Code Structure

### JavaScript Modules

#### `products.js`
Core product data management:
- `initializeProducts()` - Sets up sample products if LocalStorage is empty
- `getAllProducts()` - Retrieves all products
- `getProductById(id)` - Gets a single product
- `addProduct(product)` - Adds a new product
- `updateProduct(id, product)` - Updates an existing product
- `deleteProduct(id)` - Deletes a product
- `getProductsByCategory(category)` - Filters by category
- `searchProducts(query)` - Searches products by name
- `getAllCategories()` - Gets all unique categories

#### `cart.js`
Shopping cart operations:
- `getCart()` - Gets all cart items
- `addToCart(productId)` - Adds product to cart
- `updateCartQuantity(productId, quantity)` - Updates item quantity
- `removeFromCart(productId)` - Removes item from cart
- `clearCart()` - Empties the cart
- `getCartItemCount()` - Gets total number of items
- `calculateCartTotal()` - Calculates total price
- `updateCartBadge()` - Updates cart badge in navigation

#### `main.js`
Product listing page logic:
- Product display in grid layout
- Search and filter functionality
- Add to cart integration

#### `admin.js`
Admin panel logic:
- Product management (CRUD operations)
- Form validation
- Modal handling

#### `cart-page.js`
Cart page display:
- Cart items rendering
- Quantity updates
- Total calculation
- Checkout simulation

### CSS Architecture

The `style.css` file uses:
- **CSS Variables**: For consistent colors and spacing
- **Flexbox**: For layout and alignment
- **CSS Grid**: For responsive product grids
- **Mobile-First Design**: Responsive breakpoints for different screen sizes
- **Modern UI**: Clean, professional styling with shadows and transitions

## Browser Compatibility

This website works on all modern browsers:
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

**Note**: LocalStorage is used for data persistence. If LocalStorage is disabled in your browser, the app will not save data between sessions.

## Customization

### Adding New Categories

To add new product categories, edit `admin.html`:
1. Find the category select dropdown
2. Add a new `<option>` with your category name
3. Products with this category will automatically appear in filters

### Changing Colors

Edit `css/style.css`:
1. Find the `:root` section at the top
2. Modify CSS variables:
   - `--primary-color`: Main brand color
   - `--secondary-color`: Accent color
   - `--text-dark`: Text color
   - etc.

### Modifying Sample Products

Edit `js/products.js`:
1. Find the `initializeProducts()` function
2. Modify the `sampleProducts` array
3. Clear your browser's LocalStorage to see changes (or delete products through admin panel)

## Technical Details

### LocalStorage Structure

**Products Storage Key**: `ecommerce_products`
```javascript
[
  {
    id: 1234567890,
    name: "Product Name",
    price: 29.99,
    category: "Electronics",
    image: "https://example.com/image.jpg",
    description: "Product description"
  }
]
```

**Cart Storage Key**: `ecommerce_cart`
```javascript
[
  {
    productId: 1234567890,
    quantity: 2
  }
]
```

## Learning Resources

This project is designed to help beginners learn:
- **HTML5**: Semantic structure and forms
- **CSS3**: Flexbox, Grid, responsive design, modern styling
- **JavaScript ES6+**: Functions, arrays, objects, DOM manipulation, LocalStorage
- **Web Development Concepts**: CRUD operations, data persistence, responsive design

## Future Enhancements

Potential improvements for this project:
- Backend integration (Node.js, PHP, etc.)
- User authentication
- Payment gateway integration
- Product reviews and ratings
- Image upload functionality
- Order history
- Wishlist feature
- Product recommendations

## License

This project is open source and available for educational purposes.

## Support

For questions or issues:
1. Check the code comments for explanations
2. Review browser console for error messages
3. Ensure LocalStorage is enabled in your browser

---

**Enjoy building and learning!** 🚀

