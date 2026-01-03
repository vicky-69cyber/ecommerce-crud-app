/**
 * Product Data Management Module
 * Handles all LocalStorage operations for products
 */

// LocalStorage key for storing products
const PRODUCTS_STORAGE_KEY = 'ecommerce_products';

/**
 * Initialize products with sample data if LocalStorage is empty
 * This ensures the app has some products to display on first load
 */
function initializeProducts() {
    // Check if products already exist in LocalStorage
    const existingProducts = getAllProducts();
    
    // If no products exist, add sample products
    if (existingProducts.length === 0) {
        const sampleProducts = [
            {
                id: Date.now(),
                name: 'Wireless Mouse',
                price: 29.99,
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
                description: 'Ergonomic wireless mouse with high precision sensor'
            },
            {
                id: Date.now() + 1,
                name: 'Cotton T-Shirt',
                price: 19.99,
                category: 'Clothing',
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
                description: 'Comfortable 100% cotton t-shirt in various colors'
            },
            {
                id: Date.now() + 2,
                name: 'JavaScript Guide Book',
                price: 39.99,
                category: 'Books',
                image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
                description: 'Complete guide to modern JavaScript programming'
            },
            {
                id: Date.now() + 3,
                name: 'Laptop Stand',
                price: 49.99,
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400',
                description: 'Adjustable aluminum laptop stand for better ergonomics'
            },
            {
                id: Date.now() + 4,
                name: 'Denim Jeans',
                price: 59.99,
                category: 'Clothing',
                image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
                description: 'Classic fit denim jeans made from premium denim'
            },
            {
                id: Date.now() + 5,
                name: 'Python Programming',
                price: 44.99,
                category: 'Books',
                image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
                description: 'Learn Python programming from beginner to advanced'
            },
            {
                id: Date.now() + 6,
                name: 'Wireless Headphones',
                price: 79.99,
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                description: 'Premium wireless headphones with noise cancellation'
            },
            {
                id: Date.now() + 7,
                name: 'Running Shoes',
                price: 89.99,
                category: 'Clothing',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
                description: 'Comfortable running shoes with excellent cushioning'
            }
        ];
        
        // Save sample products to LocalStorage
        try {
            localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(sampleProducts));
            return sampleProducts;
        } catch (error) {
            console.error('Error initializing products:', error);
            return [];
        }
    }
    
    return existingProducts;
}

/**
 * Get all products from LocalStorage
 * @returns {Array} Array of all product objects
 */
function getAllProducts() {
    try {
        // Get products from LocalStorage
        const productsJson = localStorage.getItem(PRODUCTS_STORAGE_KEY);
        
        // If no products exist, return empty array
        if (!productsJson) {
            return [];
        }
        
        // Parse JSON string to JavaScript array
        return JSON.parse(productsJson);
    } catch (error) {
        console.error('Error getting products:', error);
        return [];
    }
}

/**
 * Get a single product by its ID
 * @param {number} id - The product ID
 * @returns {Object|null} The product object or null if not found
 */
function getProductById(id) {
    const products = getAllProducts();
    
    // Find product with matching ID
    return products.find(product => product.id === id) || null;
}

/**
 * Add a new product to LocalStorage
 * @param {Object} product - Product object (without id, will be auto-generated)
 * @returns {Object} The added product with generated ID
 */
function addProduct(product) {
    try {
        const products = getAllProducts();
        
        // Generate unique ID using timestamp
        const newProduct = {
            ...product,
            id: Date.now()
        };
        
        // Add new product to array
        products.push(newProduct);
        
        // Save updated array back to LocalStorage
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
        
        return newProduct;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}

/**
 * Update an existing product in LocalStorage
 * @param {number} id - The product ID to update
 * @param {Object} updatedProduct - Updated product data (without id)
 * @returns {Object|null} The updated product or null if not found
 */
function updateProduct(id, updatedProduct) {
    try {
        const products = getAllProducts();
        
        // Find index of product with matching ID
        const productIndex = products.findIndex(product => product.id === id);
        
        // If product not found, return null
        if (productIndex === -1) {
            return null;
        }
        
        // Update product (keep original ID)
        products[productIndex] = {
            ...updatedProduct,
            id: id
        };
        
        // Save updated array back to LocalStorage
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
        
        return products[productIndex];
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

/**
 * Delete a product from LocalStorage
 * @param {number} id - The product ID to delete
 * @returns {boolean} True if product was deleted, false if not found
 */
function deleteProduct(id) {
    try {
        const products = getAllProducts();
        
        // Filter out the product with matching ID
        const filteredProducts = products.filter(product => product.id !== id);
        
        // If no product was removed, return false
        if (filteredProducts.length === products.length) {
            return false;
        }
        
        // Save filtered array back to LocalStorage
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(filteredProducts));
        
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}

/**
 * Get products filtered by category
 * @param {string} category - The category to filter by
 * @returns {Array} Array of products in the specified category
 */
function getProductsByCategory(category) {
    const products = getAllProducts();
    
    // If "All" category is selected, return all products
    if (category === 'All' || !category) {
        return products;
    }
    
    // Filter products by category
    return products.filter(product => product.category === category);
}

/**
 * Search products by name (case-insensitive)
 * @param {string} query - The search query
 * @returns {Array} Array of products matching the search query
 */
function searchProducts(query) {
    const products = getAllProducts();
    
    // If query is empty, return all products
    if (!query || query.trim() === '') {
        return products;
    }
    
    // Convert query to lowercase for case-insensitive search
    const searchQuery = query.toLowerCase().trim();
    
    // Filter products whose name contains the search query
    return products.filter(product => 
        product.name.toLowerCase().includes(searchQuery)
    );
}

/**
 * Get all unique categories from products
 * @returns {Array} Array of unique category names
 */
function getAllCategories() {
    const products = getAllProducts();
    
    // Extract categories and remove duplicates using Set
    const categories = [...new Set(products.map(product => product.category))];
    
    // Sort categories alphabetically
    return categories.sort();
}

