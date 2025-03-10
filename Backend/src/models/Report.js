class Report {
    constructor(userId, category, description, email) {
      this.userId = userId || null; 
      this.category = category;
      this.description = description;
      this.email = email || null; 
    }
  
    toJSON() {
      return {
        userId: this.userId,
        category: this.category,
        description: this.description,
        email: this.email,
      };
    }
  
    static validate(reportData) {
      const errors = [];
  
      if (!reportData.category || reportData.category.length < 2) {
        errors.push("Please select a Category");
      }
  
      if (!reportData.description) {
        errors.push("Description must be provided");
      }
  
      if (reportData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(reportData.email)) {
          errors.push("Email must be a valid email address");
        }
      }
  
      return {
        isValid: errors.length === 0,
        errors,
      };
    }
  }
  
  module.exports = Report;