const readline = require("readline-sync");
const Sentiment = require("sentiment");
const db = require("./db");

const sentiment = new Sentiment();

/**
 * Generates the next FeedbackID in format "F00001", "F00002", etc.
 */
const getNextFeedbackID = async () => {
    const snapshot = await db.collection("Feedbacks").orderBy("FeedbackID", "desc").limit(1).get();
    if (snapshot.empty) {
        return "F00001"; // First feedback
    }
    const lastID = snapshot.docs[0].data().FeedbackID; // Get last FeedbackID
    const nextID = parseInt(lastID.substring(1)) + 1; // Extract number and increment
    return `F${String(nextID).padStart(5, "0")}`; // Format as "F00001"
};

const saveFeedback = async () => {
    const WorkerID = readline.question("Enter Worker ID: ");
    const ReviewGiverID = readline.question("Enter Review Giver ID: ");
    const Feedback = readline.question("Enter Feedback: ");

    const sentimentScore = sentiment.analyze(Feedback).score; // Get sentiment score
    const normalizedScore = Math.max(0, Math.min(10, sentimentScore + 5)); // Normalize to 0-10

    const FeedbackID = await getNextFeedbackID(); // Generate auto-incremented ID

    const feedbackData = {
        FeedbackID,
        WorkerID,
        ReviewGiverID,
        Feedback,
        SentimentScore: normalizedScore,
        Timestamp: new Date(),
    };

    try {
        await db.collection("feedback").doc(FeedbackID).set(feedbackData);
        console.log(`✅ Feedback saved successfully! ID: ${FeedbackID}`);
    } catch (error) {
        console.error("❌ Error saving feedback:", error);
    }
};

// Run the function
saveFeedback();
