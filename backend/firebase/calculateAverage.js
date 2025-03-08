const db = require("./index"); // Import Firestore instance

const getWorkerRatings = async () => {
    const snapshot = await db.collection("Feedbacks").get(); // Get all feedbacks
    const workerRatings = {}; // Store worker ratings

    // Step 1: Loop through each feedback document
    snapshot.forEach((doc) => {
        const data = doc.data();
        const { WorkerID, FeedbackRating } = data;

        // Step 2: Aggregate ratings for each worker
        if (!workerRatings[WorkerID]) {
            workerRatings[WorkerID] = { totalRating: 0, count: 0 };
        }

        workerRatings[WorkerID].totalRating += FeedbackRating;
        workerRatings[WorkerID].count += 1;
    });

    // Step 3: Calculate the average rating for each worker
    const workerAverages = Object.keys(workerRatings).map((workerID) => {
        return {
            WorkerID: workerID,
            AverageRating: workerRatings[workerID].totalRating / workerRatings[workerID].count,
        };
    });

    // Step 4: Sort by AverageRating in descending order
    workerAverages.sort((a, b) => b.AverageRating - a.AverageRating);

    // Step 5: Display results
    console.log("Worker Ratings in Descending Order:");
    console.table(workerAverages);
};

// Call the function
getWorkerRatings();
