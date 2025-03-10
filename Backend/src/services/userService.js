const signupUser = async () => {
    const userData = {
      email: "testuser@example.com",
      password: "StrongPassword123!",
      username: "testuser",
      location: "New York",
      userType: "regular"
    };
  
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Signup failed');
      }
  
      const result = await response.json();
      console.log('Signup successful:', result);
    } catch (error) {
      console.error('Signup error:', error.message);
    }
  };
  
  // Call the function
  signupUser();