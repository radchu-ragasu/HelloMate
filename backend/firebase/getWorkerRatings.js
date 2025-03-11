const db = require("./db");

const getWorkerRatings = async () => {
    const snapshot = await db.collection("Feedbacks").get();
    const workerRatings = {};

    snapshot.forEach((doc) => {
        const data = doc.data();
        const { WorkerID, SentimentScore } = data;

        if (!workerRatings[WorkerID]) {
            workerRatings[WorkerID] = { totalScore: 0, count: 0 };
        }

        workerRatings[WorkerID].totalScore += SentimentScore;
        workerRatings[WorkerID].count += 1;
    });

    // Calculate average sentiment score per worker
    const workerAverages = Object.keys(workerRatings).map((workerID) => ({
        WorkerID: workerID,
        AverageRating: workerRatings[workerID].totalScore / workerRatings[workerID].count,
    }));

    // Sort workers by AverageRating in descending order
    workerAverages.sort((a, b) => b.AverageRating - a.AverageRating);

    console.log("\n📊 Worker Ratings in Descending Order:");
    console.table(workerAverages);
};

// Run the function
getWorkerRatings();
