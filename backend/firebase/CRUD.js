const db = require("./index"); // Import Firestore instance
const readline = require("readline-sync"); // Import readline-sync for input

const saveFeedback = async () => {
    // Step 1: Get the latest feedback count
    const snapshot = await db.collection("Feedbacks").get();
    const FeedbackCount = snapshot.size + 1; // Get next feedback number

    // Step 2: Generate FeedbackID (F00001, F00002, ...)
    const FeedbackID = `F${String(FeedbackCount).padStart(5, "0")}`;

    // Step 3: Ask user for input
    const workerID = readline.question("Enter Worker ID: ");
    const reviewGiverID = readline.question("Enter Review Giver ID: ");
    const Feedback = readline.question("Enter Feedback: ");
    const FeedbackRating = readline.questionInt("Enter Feedback Rating (1-5): ");

    // Step 4: Save data to Firestore
    await db.collection("Feedbacks").doc(FeedbackID).set({
        WorkerID: workerID,
        ReviewGiverID: reviewGiverID,
        Feedback: Feedback,
        FeedbackRating: FeedbackRating,
        FeedbackID: FeedbackID, // Store FeedbackID inside document
    });

    console.log(`Feedback saved successfully with ID: ${FeedbackID}`);
};

// Call the function
saveFeedback();
