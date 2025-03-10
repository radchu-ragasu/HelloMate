const db = require("./index"); // Import Firestore instance

const getWorkerRatings = async () => {
    const snapshot = await db.collection("Feedbacks").get(); // Get all feedbacks
    const workerRatings = {}; // Store worker ratings

    snapshot.forEach((doc) => {
        const data = doc.data();
        const { WorkerID, FeedbackRating } = data;

        if (!workerRatings[WorkerID]) {
            workerRatings[WorkerID] = { totalRating: 0, count: 0 };
        }

        workerRatings[WorkerID].totalRating += FeedbackRating;
        workerRatings[WorkerID].count += 1;
    });

    // Calculate average rating for each worker
    const workerAverages = Object.keys(workerRatings).map((workerID) => {
        return {
            WorkerID: workerID,
            AverageRating: workerRatings[workerID].totalRating / workerRatings[workerID].count,
        };
    });

    workerAverages.sort((a, b) => b.AverageRating - a.AverageRating); // Sort by average rating

    console.log("Worker Ratings in Descending Order:");
    console.table(workerAverages); // Display results
};

getWorkerRatings();
