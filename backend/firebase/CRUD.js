const admin = require("firebase-admin");
const readlineSync = require("readline-sync");
const { ChatGroq } = require("langchain_groq");
const { ChatPromptTemplate } = require("langchain_core");
const { LLMChain } = require("langchain_chains");
require("dotenv").config();

// Initialize Firebase Admin SDK
const serviceAccount = require("./SecurityProduct.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-firebase-database-url.firebaseio.com",
});

const db = admin.firestore(); // Firestore instance

// Initialize LangChain for Sentiment Analysis using Groq API
const groqApiKey = process.env.GROQ_KEY;
const llm = new ChatGroq({ groq_api_key: groqApiKey, model_name: "qwen-2.5-32b" });

const prompt = ChatPromptTemplate.fromTemplate(
  `
  You are an expert sentiment analysis model. Analyze the sentiment of the following review 
  and provide a sentiment score as a float with 5 decimal places.

  - If the sentiment is negative, the score should be below 5.00000.
  - If the sentiment is positive, the score should be above 5.00000.
  - The score should vary based on the review content, ranging between 0.00000 and 10.00000.

  Review: {review}
  Sentiment Score:
  `
);

const sentimentChain = new LLMChain({ llm: llm, prompt: prompt });

// Function to save feedback and sentiment to Firestore
const saveFeedback = async () => {
  // Step 1: Get user input
  const workerID = readlineSync.question("Enter Worker ID: ");
  const reviewGiverID = readlineSync.question("Enter Review Giver ID: ");
  const feedback = readlineSync.question("Enter Feedback: ");

  // Step 2: Analyze sentiment using LangChain
  const response = await sentimentChain.invoke({ review: feedback });
  const sentimentScore = parseFloat(response.text.trim());

  // Step 3: Save feedback and sentiment score to Firebase
  const feedbackID = `F${String(Date.now()).padStart(5, "0")}`; // Generate unique ID for feedback

  await db.collection("Feedbacks").doc(feedbackID).set({
    WorkerID: workerID,
    ReviewGiverID: reviewGiverID,
    Feedback: feedback,
    SentimentScore: sentimentScore, // Store the sentiment score
    FeedbackID: feedbackID,
  });

  console.log(`Feedback saved successfully with ID: ${feedbackID}`);
};

// Call the function to save feedback
saveFeedback().catch((error) => console.error("Error saving feedback:", error));
