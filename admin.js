/**
 * Admin Panel Logic
 * Handles product management: add, edit, delete operations
 */

// Track whether we're in edit mode or add mode
let isEditMode = false;
let currentEditId = null;

// Initialize admin panel when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize products if empty
    initializeProducts();
    
    // Load and display products
    loadProductsForEdit();
    
    // Update cart badge
    updateCartBadge();
    
    // Set up event listeners
    setupEventListeners();
});

/**
 * Load all products and display them in the admin panel
 */
function loadProductsForEdit() {
    const products = getAllProducts();
    const adminProductsList = document.getElementById('admin-products-list');
    
    // Clear existing content
    adminProductsList.innerHTML = '';
    
    // If no products, show message
    if (products.length === 0) {
        adminProductsList.innerHTML = '<div class="no-products">No products found. Add your first product!</div>';
        return;
    }
    
    // Create and append product items
    products.forEach(product => {
        const productItem = createAdminProductItem(product);
        adminProductsList.appendChild(productItem);
    });
}

/**
 * Create an admin product item element (for the product list)
 * @param {Object} product - Product object
 * @returns {HTMLElement} Product item element
 */
function createAdminProductItem(product) {
    // Create container
    const item = document.createElement('div');
    item.className = 'admin-product-item';
    
    // Create product image
    const image = document.createElement('img');
    image.src = product.image || 'https://via.placeholder.com/400';
    image.alt = product.name;
    image.className = 'admin-product-image';
    image.onerror = function() {
        this.src = 'https://via.placeholder.com/400';
    };
    
    // Create product name
    const name = document.createElement('div');
    name.className = 'admin-product-name';
    name.textContent = product.name;
    
    // Create product price
    const price = document.createElement('div');
    price.className = 'admin-product-price';
    price.textContent = `$${product.price.toFixed(2)}`;
    
    // Create product category
    const category = document.createElement('div');
    category.className = 'admin-product-category';
    category.textContent = product.category;
    
    // Create actions container
    const actions = document.createElement('div');
    actions.className = 'admin-actions';
    
    // Create Edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-primary btn-small';
    editBtn.textContent = 'Edit';
    editBtn.onclick = function() {
        showEditForm(product.id);
    };
    
    // Create Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-small';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
        handleDeleteProduct(product.id);
    };
    
    // Assemble the item
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    
    item.appendChild(image);
    item.appendChild(name);
    item.appendChild(price);
    item.appendChild(category);
    item.appendChild(actions);
    
    return item;
}

/**
 * Show the add product form (reset form and open modal)
 */
function showAddForm() {
    isEditMode = false;
    currentEditId = null;
    
    // Set modal title
    document.getElementById('modal-title').textContent = 'Add New Product';
    
    // Reset form
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    
    // Clear error messages
    clearErrorMessages();
    
    // Show modal
    document.getElementById('product-modal').classList.add('active');
}

/**
 * Show the edit product form (populate with product data)
 * @param {number} productId - The ID of the product to edit
 */
function showEditForm(productId) {
    const product = getProductById(productId);
    
    if (!product) {
        alert('Product not found!');
        return;
    }
    
    isEditMode = true;
    currentEditId = productId;
    
    // Set modal title
    document.getElementById('modal-title').textContent = 'Edit Product';
    
    // Populate form fields with product data
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-image').value = product.image;
    document.getElementById('product-description').value = product.description || '';
    
    // Clear error messages
    clearErrorMessages();
    
    // Show modal
    document.getElementById('product-modal').classList.add('active');
}

/**
 * Handle form submission (add or update product)
 * @param {Event} event - Form submit event
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Clear previous error messages
    clearErrorMessages();
    
    // Get form values
    const name = document.getElementById('product-name').value.trim();
    const price = parseFloat(document.getElementById('product-price').value);
    const category = document.getElementById('product-category').value;
    const image = document.getElementById('product-image').value.trim();
    const description = document.getElementById('product-description').value.trim();
    
    // Validate form fields
    let isValid = true;
    
    if (!name) {
        showError('name-error', 'Product name is required');
        isValid = false;
    }
    
    if (isNaN(price) || price <= 0) {
        showError('price-error', 'Please enter a valid price greater than 0');
        isValid = false;
    }
    
    if (!category) {
        showError('category-error', 'Please select a category');
        isValid = false;
    }
    
    if (!image) {
        showError('image-error', 'Image URL is required');
        isValid = false;
    }
    
    // If validation fails, stop submission
    if (!isValid) {
        return;
    }
    
    // Create product object
    const productData = {
        name: name,
        price: price,
        category: category,
        image: image,
        description: description
    };
    
    try {
        if (isEditMode) {
            // Update existing product
            updateProduct(currentEditId, productData);
            alert('Product updated successfully!');
        } else {
            // Add new product
            addProduct(productData);
            alert('Product added successfully!');
        }
        
        // Close modal
        closeModal();
        
        // Reload products list
        loadProductsForEdit();
        
    } catch (error) {
        console.error('Error saving product:', error);
        alert('Failed to save product. Please try again.');
    }
}

/**
 * Handle product deletion
 * @param {number} productId - The ID of the product to delete
 */
function handleDeleteProduct(productId) {
    // Confirm deletion
    const product = getProductById(productId);
    const confirmMessage = `Are you sure you want to delete "${product.name}"? This action cannot be undone.`;
    
    if (!confirm(confirmMessage)) {
        return;
    }
    
    try {
        deleteProduct(productId);
        alert('Product deleted successfully!');
        loadProductsForEdit();
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
    }
}

/**
 * Close the modal
 */
function closeModal() {
    document.getElementById('product-modal').classList.remove('active');
    document.getElementById('product-form').reset();
    clearErrorMessages();
}

/**
 * Show error message for a form field
 * @param {string} errorId - The ID of the error message element
 * @param {string} message - The error message to display
 */
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Clear all error messages
 */
function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

/**
 * Set up all event listeners for the admin panel
 */
function setupEventListeners() {
    // Add product button
    const addProductBtn = document.getElementById('add-product-btn');
    addProductBtn.addEventListener('click', showAddForm);
    
    // Form submission
    const productForm = document.getElementById('product-form');
    productForm.addEventListener('submit', handleFormSubmit);
    
    // Close modal button
    const closeModalBtn = document.getElementById('close-modal');
    closeModalBtn.addEventListener('click', closeModal);
    
    // Cancel button
    const cancelBtn = document.getElementById('cancel-btn');
    cancelBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside of it
    const modal = document.getElementById('product-modal');
    modal.addEventListener('click', function(event) {
        // If clicked on the modal backdrop (not the modal content)
        if (event.target === modal) {
            closeModal();
        }
    });
}

