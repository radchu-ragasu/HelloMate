const express = require("express");
const ReportController = require("../controllers/reportController");

const router = express.Router();

router.post("/report", ReportController.submitReport); 
router.get("/reports", ReportController.getReports); 

module.exports = router;