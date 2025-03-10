const axios = require('axios');

// Function to analyze sentiment
const analyzeSentiment = async (review) => {
    const groqApiKey = process.env.GROQ_KEY; // Get API Key from the environment variables
    const url = "https://api.groq.com/sentiment"; // Replace with the actual Groq API endpoint

    try {
        // Send POST request to Groq API
        const response = await axios.post(url, {
            review: review
        }, {
            headers: {
                'Authorization': `Bearer ${groqApiKey}`, // Authorization header with API key
                'Content-Type': 'application/json'
            }
        });

        // Return the sentiment score from the API response
        const sentimentScore = response.data.score; // Adjust based on the actual response format
        return sentimentScore;
    } catch (error) {
        console.error("Error analyzing sentiment:", error);
        return null;
    }
};

// Example usage
const testSentiment = async () => {
    const review = "The product is excellent!";  // Sample review
    const sentimentScore = await analyzeSentiment(review);
    console.log("Sentiment score:", sentimentScore);  // Output the sentiment score
};

// Call the function for testing
testSentiment();

module.exports = { analyzeSentiment }; // Export the function so it can be used elsewhere
