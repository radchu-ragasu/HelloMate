const Sentiment = require('sentiment');
const sentiment = new Sentiment();

// Function to analyze feedback sentiment
function analyzeFeedback(feedbackText) {
  const result = sentiment.analyze(feedbackText);
  const score = result.score / 100; // Convert to fractional score, dividing by 100.
  return score.toFixed(5); // Round the score to 5 decimal places
}

// Example feedback analysis
const feedback = "The carpenter did an excellent job! Very satisfied!";
const sentimentScore = analyzeFeedback(feedback);
console.log("Sentiment Score:", sentimentScore); // This will output a fractional score like 0.52000
