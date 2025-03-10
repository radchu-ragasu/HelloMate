class Listing {
    constructor(userId, title, description, category, price) {
      this.userId = userId;
      this.title = title;
      this.description = description;
      this.category = category;
      this.price = price;
      this.createdAt = new Date();
    }
  
    toJSON() {
      return {
        userId: this.userId,
        title: this.title,
        description: this.description,
        category: this.category,
        price: this.price,
        createdAt: this.createdAt
      };
    }
  
    static validate(listingData) {
      const errors = [];
      
      if (!listingData.title || listingData.title.length < 3) {
        errors.push('Title must be at least 3 characters long');
      }
      
      if (!listingData.description || listingData.description.length < 10) {
        errors.push('Description must be at least 10 characters long');
      }
      
      if (!listingData.category) {
        errors.push('Category is required');
      }
      
      if (!listingData.price || parseFloat(listingData.price) <= 0) {
        errors.push('Price must be a positive number');
      }
      
      return {
        isValid: errors.length === 0,
        errors
      };
    }
  }
  
  module.exports = Listing;