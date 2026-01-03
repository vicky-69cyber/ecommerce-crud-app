/**
 * Main Product Listing Page Logic
 * Handles displaying products, search, filter, and add to cart functionality
 */

// Initialize products when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sample products if LocalStorage is empty
    initializeProducts();
    
    // Load and display products
    loadAndDisplayProducts();
    
    // Load categories into filter dropdown
    loadCategories();
    
    // Update cart badge
    updateCartBadge();
    
    // Set up event listeners
    setupEventListeners();
});

/**
 * Load all products and display them on the page
 */
function loadAndDisplayProducts() {
    const products = getAllProducts();
    displayProducts(products);
}

/**
 * Display products in a grid layout
 * @param {Array} products - Array of product objects to display
 */
function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    const noProductsMessage = document.getElementById('no-products');
    
    // Clear existing products
    productsGrid.innerHTML = '';
    
    // If no products, show empty message
    if (products.length === 0) {
        productsGrid.style.display = 'none';
        noProductsMessage.style.display = 'block';
        return;
    }
    
    // Hide empty message and show grid
    noProductsMessage.style.display = 'none';
    productsGrid.style.display = 'grid';
    
    // Create and append product cards
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

/**
 * Create a product card element
 * @param {Object} product - Product object
 * @returns {HTMLElement} Product card element
 */
function createProductCard(product) {
    // Create card container
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Create product image
    const image = document.createElement('img');
    image.src = product.image || 'https://via.placeholder.com/400';
    image.alt = product.name;
    image.className = 'product-image';
    image.onerror = function() {
        // If image fails to load, use placeholder
        this.src = 'https://via.placeholder.com/400';
    };
    
    // Create product info container
    const info = document.createElement('div');
    info.className = 'product-info';
    
    // Create product name
    const name = document.createElement('h3');
    name.className = 'product-name';
    name.textContent = product.name;
    
    // Create product category
    const category = document.createElement('p');
    category.className = 'product-category';
    category.textContent = product.category;
    
    // Create product price
    const price = document.createElement('div');
    price.className = 'product-price';
    price.textContent = `$${product.price.toFixed(2)}`;
    
    // Create "Add to Cart" button
    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'btn btn-primary add-to-cart-btn';
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.onclick = function() {
        // Call the addToCart function from cart.js
        addToCart(product.id);
        // Update cart badge
        updateCartBadge();
        // Show visual feedback
        addToCartBtn.textContent = 'Added!';
        addToCartBtn.style.backgroundColor = '#27ae60';
        setTimeout(() => {
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.style.backgroundColor = '';
        }, 1000);
    };
    
    // Assemble the card
    info.appendChild(name);
    info.appendChild(category);
    info.appendChild(price);
    info.appendChild(addToCartBtn);
    
    card.appendChild(image);
    card.appendChild(info);
    
    return card;
}

/**
 * Load all unique categories and populate the filter dropdown
 */
function loadCategories() {
    const categories = getAllCategories();
    const categoryFilter = document.getElementById('category-filter');
    
    // Clear existing options (except "All")
    categoryFilter.innerHTML = '<option value="All">All Categories</option>';
    
    // Add each category as an option
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

/**
 * Handle search functionality
 * Filters products as user types
 */
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const searchQuery = searchInput.value.trim();
    const selectedCategory = categoryFilter.value;
    
    let filteredProducts = getAllProducts();
    
    // Apply search filter
    if (searchQuery) {
        filteredProducts = searchProducts(searchQuery);
    }
    
    // Apply category filter
    if (selectedCategory && selectedCategory !== 'All') {
        filteredProducts = filteredProducts.filter(
            product => product.category === selectedCategory
        );
    }
    
    // Display filtered products
    displayProducts(filteredProducts);
}

/**
 * Handle category filter change
 */
function handleCategoryFilter() {
    // Re-run search to apply both filters
    handleSearch();
}

/**
 * Clear all search and filter inputs
 */
function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('category-filter').value = 'All';
    loadAndDisplayProducts();
}


/**
 * Set up all event listeners for the page
 */
function setupEventListeners() {
    // Search input - filter products as user types
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', handleSearch);
    
    // Category filter dropdown
    const categoryFilter = document.getElementById('category-filter');
    categoryFilter.addEventListener('change', handleCategoryFilter);
    
    // Clear filters button
    const clearFiltersBtn = document.getElementById('clear-filters');
    clearFiltersBtn.addEventListener('click', clearFilters);
}

