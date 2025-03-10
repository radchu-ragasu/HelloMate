class User {
    constructor(email, userType, name, location) {
      this.email = email;
      this.userType = userType;
      this.name = name;
      this.location = location;
      this.createdAt = new Date();
    }
  
    toJSON() {
      return {
        email: this.email,
        userType: this.userType,
        name: this.name,
        location: this.location,
        createdAt: this.createdAt
      };
    }
  
    static validate(userData) {
      const errors = [];
      
      if (!userData.email || !userData.email.includes('@')) {
        errors.push('Invalid email address');
      }
      
      if (!userData.name || userData.name.length < 2) {
        errors.push('Name must be at least 2 characters long');
      }
      
      if (!['customer', 'service_provider'].includes(userData.userType)) {
        errors.push('Invalid user type');
      }
      
      return {
        isValid: errors.length === 0,
        errors
      };
    }
  }
  
  module.exports = User;