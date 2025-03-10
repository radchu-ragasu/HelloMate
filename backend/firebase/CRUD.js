const db = require("./index"); // Import Firestore instance
const { analyzeSentiment } = require("../LLM/LLM"); // Import sentiment analysis function

const saveFeedback = async () => {
    // Step 1: Generate FeedbackID (F00001, F00002, ...)
    const snapshot = await db.collection("Feedbacks").get();
    const FeedbackCount = snapshot.size + 1; // Get next feedback number
    const FeedbackID = `F${String(FeedbackCount).padStart(5, "0")}`; // Generate FeedbackID

    // Step 2: Get feedback input from customer
    const readline = require("readline-sync");
    const reviewGiverID = readline.question("Enter Review Giver ID: ");
    const Feedback = readline.question("Enter Feedback: ");

    // Step 3: Analyze sentiment of the feedback
    const sentimentScore = await analyzeSentiment(Feedback); // Call the sentiment analysis function

    // Step 4: Save the feedback and sentiment score to Firestore
    await db.collection("Feedbacks").doc(FeedbackID).set({
        ReviewGiverID: reviewGiverID,
        Feedback: Feedback,
        SentimentScore: sentimentScore, // Store sentiment score
        FeedbackID: FeedbackID, // Store FeedbackID
    });

    console.log(`Feedback saved successfully with ID: ${FeedbackID}`);
};

// Call the function
saveFeedback();
