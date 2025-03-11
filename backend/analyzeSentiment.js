const Sentiment = require("sentiment");
const sentiment = new Sentiment();

// Function to analyze sentiment
function analyzeFeedback(feedback) {
    const result = sentiment.analyze(feedback);
    console.log(`Score: ${result.score}`);
    return result.score;
}

// Example usage
const feedbackText = "This worker did an amazing job!";
const score = analyzeFeedback(feedbackText);
console.log(`Sentiment Score: ${score}`);
