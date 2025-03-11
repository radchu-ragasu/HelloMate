const Sentiment = require("sentiment");
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseService.json"); // Replace with your Firebase service account JSON

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

const sentiment = new Sentiment(); // Initialize Sentiment Analyzer

const getWorkerRatings = async () => {
  const snapshot = await db.collection("Feedbacks").get(); // Get all feedbacks
  const workerRatings = {}; // Store worker ratings

  snapshot.forEach((doc) => {
    const data = doc.data();
    const { WorkerID, Feedback } = data;

    // Analyze sentiment score
    const sentimentScore = sentiment.analyze(Feedback).score; // Returns sentiment points

    // Aggregate ratings for each worker
    if (!workerRatings[WorkerID]) {
      workerRatings[WorkerID] = { totalRating: 0, count: 0 };
    }

    workerRatings[WorkerID].totalRating += sentimentScore; // Add sentiment points
    workerRatings[WorkerID].count += 1;
  });

  // Calculate the average sentiment score for each worker
  const workerAverages = Object.keys(workerRatings).map((workerID) => ({
    WorkerID: workerID,
    AverageRating: workerRatings[workerID].totalRating / workerRatings[workerID].count,
  }));

  // Sort by AverageRating in descending order
  workerAverages.sort((a, b) => b.AverageRating - a.AverageRating);

  // Display results
  console.log("Worker Ratings in Descending Order:");
  console.table(workerAverages);
};

// Call the function
getWorkerRatings();
