/**
 * Shopping Cart Management Module
 * Handles all cart operations using LocalStorage
 */

// LocalStorage key for storing cart items
const CART_STORAGE_KEY = 'ecommerce_cart';

/**
 * Get all items from the cart
 * @returns {Array} Array of cart items {productId, quantity}
 */
function getCart() {
    try {
        const cartJson = localStorage.getItem(CART_STORAGE_KEY);
        
        if (!cartJson) {
            return [];
        }
        
        return JSON.parse(cartJson);
    } catch (error) {
        console.error('Error getting cart:', error);
        return [];
    }
}

/**
 * Add a product to the cart
 * If product already exists, increase quantity by 1
 * @param {number} productId - The ID of the product to add
 */
function addToCart(productId) {
    try {
        const cart = getCart();
        
        // Check if product already exists in cart
        const existingItem = cart.find(item => item.productId === productId);
        
        if (existingItem) {
            // If product exists, increase quantity
            existingItem.quantity += 1;
        } else {
            // If product doesn't exist, add new item with quantity 1
            cart.push({
                productId: productId,
                quantity: 1
            });
        }
        
        // Save updated cart to LocalStorage
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        
        // Update cart badge in navigation
        updateCartBadge();
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
}

/**
 * Update the quantity of a product in the cart
 * @param {number} productId - The ID of the product
 * @param {number} quantity - New quantity (must be at least 1)
 */
function updateCartQuantity(productId, quantity) {
    try {
        // Validate quantity
        if (quantity < 1) {
            quantity = 1;
        }
        
        const cart = getCart();
        const item = cart.find(item => item.productId === productId);
        
        if (item) {
            item.quantity = parseInt(quantity);
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
            updateCartBadge();
        }
    } catch (error) {
        console.error('Error updating cart quantity:', error);
        throw error;
    }
}

/**
 * Remove a product from the cart
 * @param {number} productId - The ID of the product to remove
 */
function removeFromCart(productId) {
    try {
        const cart = getCart();
        const filteredCart = cart.filter(item => item.productId !== productId);
        
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(filteredCart));
        updateCartBadge();
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
}

/**
 * Clear all items from the cart
 */
function clearCart() {
    try {
        localStorage.removeItem(CART_STORAGE_KEY);
        updateCartBadge();
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
}

/**
 * Get the total number of items in the cart
 * @returns {number} Total quantity of all items
 */
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Update the cart badge in navigation
 * Shows total number of items in cart
 */
function updateCartBadge() {
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        const itemCount = getCartItemCount();
        cartBadge.textContent = itemCount;
        
        // Hide badge if cart is empty
        if (itemCount === 0) {
            cartBadge.style.display = 'none';
        } else {
            cartBadge.style.display = 'inline-flex';
        }
    }
}

/**
 * Calculate the total price of all items in the cart
 * @returns {number} Total price
 */
function calculateCartTotal() {
    const cart = getCart();
    let total = 0;
    
    cart.forEach(item => {
        const product = getProductById(item.productId);
        if (product) {
            total += product.price * item.quantity;
        }
    });
    
    return total;
}

