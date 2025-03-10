class Order {
    constructor(userId, category, address, description, photos = []) {
        this.userId = userId;
        this.category = category;
        this.address = address;
        this.description = description;
        this.photos = photos; // Add photos field
    }

    toJSON() {
        return {
            userId: this.userId,
            category: this.category,
            address: this.address,
            description: this.description,
            photos: this.photos // Include photos in the JSON output
        };
    }

    static validate(orderData) {
        const errors = [];
        
        if (!orderData.userId) {
            errors.push('User ID is required');
        }
        
        if (!orderData.category || orderData.category.length < 2) {
            errors.push('Category must be at least 2 characters long');
        }

        if (!orderData.address || orderData.address.length < 5) {
            errors.push('Address must be at least 5 characters long');
        }

        if (!orderData.description || orderData.description.length < 10) {
            errors.push('Description must be at least 10 characters long');
        }

        // Optional: You can validate photos (e.g., ensure they are valid URIs or a specific length)
        if (orderData.photos && orderData.photos.length > 3) {
            errors.push('You can only add up to 3 images.');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

module.exports = Order;
