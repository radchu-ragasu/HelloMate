const admin = require("firebase-admin");
const Sentiment = require("sentiment");
const readline = require("readline-sync"); // For user input
require("dotenv").config();

// Initialize Firebase
const serviceAccount = require("./firebaseService.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-database.firebaseio.com"
});

const db = admin.firestore();
const sentiment = new Sentiment();

// Function to generate a unique Feedback ID
async function generateFeedbackID() {
    const feedbackRef = db.collection("feedbacks").orderBy("feedbackID", "desc").limit(1);
    const snapshot = await feedbackRef.get();

    if (snapshot.empty) {
        return "F00001"; // First feedback ID
    } else {
        const lastFeedback = snapshot.docs[0].data();
        const lastID = lastFeedback.feedbackID;
        const numericPart = parseInt(lastID.substring(1)) + 1;
        return `F${String(numericPart).padStart(5, "0")}`; // Format: F00002, F00003, ...
    }
}

// Function to save feedback with sentiment score
async function saveFeedback(workerId, reviewerId, feedbackText) {
    const score = sentiment.analyze(feedbackText).score;
    const feedbackID = await generateFeedbackID(); // Get next Feedback ID

    const feedbackRef = db.collection("feedbacks").doc(feedbackID);
    await feedbackRef.set({
        feedbackID,
        workerId,
        reviewerId,
        feedback: feedbackText,
        sentimentScore: score,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`✅ Feedback saved successfully! Feedback ID: ${feedbackID}`);
}

// Get input from customer
const workerId = readline.question("Enter Worker ID: ");
const reviewerId = readline.question("Enter Reviewer ID: ");
const feedbackText = readline.question("Enter Feedback: ");

// Save feedback
saveFeedback(workerId, reviewerId, feedbackText);
