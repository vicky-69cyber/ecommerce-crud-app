/**
 * Cart Page Logic
 * Handles displaying cart items, updating quantities, and calculating totals
 */

// Initialize cart page when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Update cart badge
    updateCartBadge();
    
    // Load and display cart items
    loadCart();
});

/**
 * Load and display all items in the cart
 */
function loadCart() {
    const cart = getCart();
    const cartContainer = document.getElementById('cart-container');
    
    // Clear existing content
    cartContainer.innerHTML = '';
    
    // If cart is empty, show empty cart message
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Start shopping to add items to your cart!</p>
                <a href="index.html" class="btn btn-primary" style="margin-top: 1rem; display: inline-block;">Browse Products</a>
            </div>
        `;
        return;
    }
    
    // Create cart items container
    const cartItems = document.createElement('div');
    cartItems.className = 'cart-items';
    
    // Create and append each cart item
    cart.forEach(cartItem => {
        const product = getProductById(cartItem.productId);
        
        // Skip if product not found (product might have been deleted)
        if (!product) {
            return;
        }
        
        const itemElement = createCartItemElement(cartItem, product);
        cartItems.appendChild(itemElement);
    });
    
    // Create cart summary
    const cartSummary = createCartSummary();
    
    // Assemble cart container
    cartContainer.appendChild(cartItems);
    cartContainer.appendChild(cartSummary);
}

/**
 * Create a cart item element
 * @param {Object} cartItem - Cart item object {productId, quantity}
 * @param {Object} product - Product object
 * @returns {HTMLElement} Cart item element
 */
function createCartItemElement(cartItem, product) {
    // Create container
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.id = `cart-item-${cartItem.productId}`;
    
    // Calculate subtotal
    const subtotal = product.price * cartItem.quantity;
    
    // Create product image
    const image = document.createElement('img');
    image.src = product.image || 'https://via.placeholder.com/400';
    image.alt = product.name;
    image.className = 'cart-item-image';
    image.onerror = function() {
        this.src = 'https://via.placeholder.com/400';
    };
    
    // Create product name container
    const nameContainer = document.createElement('div');
    nameContainer.className = 'cart-item-details';
    
    const name = document.createElement('div');
    name.className = 'cart-item-name';
    name.textContent = product.name;
    
    const category = document.createElement('div');
    category.className = 'cart-item-category';
    category.textContent = product.category;
    category.style.color = 'var(--text-light)';
    category.style.fontSize = '0.875rem';
    category.style.marginTop = '0.25rem';
    
    nameContainer.appendChild(name);
    nameContainer.appendChild(category);
    
    // Create product price
    const price = document.createElement('div');
    price.className = 'cart-item-price';
    price.textContent = `$${product.price.toFixed(2)}`;
    
    // Create quantity input
    const quantityContainer = document.createElement('div');
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.className = 'quantity-input';
    quantityInput.value = cartItem.quantity;
    quantityInput.min = '1';
    quantityInput.onchange = function() {
        const newQuantity = parseInt(quantityInput.value);
        if (newQuantity >= 1) {
            updateCartQuantity(cartItem.productId, newQuantity);
            loadCart(); // Reload cart to update totals
        } else {
            quantityInput.value = cartItem.quantity; // Revert invalid input
        }
    };
    quantityContainer.appendChild(quantityInput);
    
    // Create subtotal
    const subtotalElement = document.createElement('div');
    subtotalElement.className = 'cart-item-subtotal';
    subtotalElement.style.fontWeight = 'bold';
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    
    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-item-btn';
    removeBtn.textContent = '×';
    removeBtn.title = 'Remove item';
    removeBtn.onclick = function() {
        if (confirm(`Remove "${product.name}" from cart?`)) {
            removeFromCart(cartItem.productId);
            loadCart(); // Reload cart after removal
            updateCartBadge();
        }
    };
    
    // Assemble the item
    item.appendChild(image);
    item.appendChild(nameContainer);
    item.appendChild(price);
    item.appendChild(quantityContainer);
    item.appendChild(subtotalElement);
    item.appendChild(removeBtn);
    
    return item;
}

/**
 * Create cart summary element (total and action buttons)
 * @returns {HTMLElement} Cart summary element
 */
function createCartSummary() {
    const summary = document.createElement('div');
    summary.className = 'cart-summary';
    
    // Calculate total
    const total = calculateCartTotal();
    
    // Create total display
    const totalContainer = document.createElement('div');
    totalContainer.innerHTML = `
        <span style="font-size: 1.25rem; margin-right: 1rem;">Total:</span>
        <span class="cart-total">$${total.toFixed(2)}</span>
    `;
    
    // Create action buttons container
    const actions = document.createElement('div');
    actions.className = 'cart-actions';
    
    // Create Clear Cart button
    const clearBtn = document.createElement('button');
    clearBtn.className = 'btn btn-danger';
    clearBtn.textContent = 'Clear Cart';
    clearBtn.onclick = function() {
        if (confirm('Are you sure you want to clear your entire cart?')) {
            clearCart();
            loadCart();
            updateCartBadge();
        }
    };
    
    // Create Checkout button
    const checkoutBtn = document.createElement('button');
    checkoutBtn.className = 'btn btn-success';
    checkoutBtn.textContent = 'Checkout';
    checkoutBtn.onclick = function() {
        // For demo purposes, just show an alert
        // In a real application, this would redirect to a payment page
        alert(`Thank you! Your order total is $${total.toFixed(2)}.\n\nThis is a demo. In a real application, you would be redirected to the payment page.`);
    };
    
    // Assemble actions
    actions.appendChild(clearBtn);
    actions.appendChild(checkoutBtn);
    
    // Assemble summary
    summary.appendChild(totalContainer);
    summary.appendChild(actions);
    
    return summary;
}

