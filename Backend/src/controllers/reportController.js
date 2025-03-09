const { database } = require("../config/firebaseConfig");
const Report = require("../models/Report");

class ReportController {
  static async submitReport(req, res) {
    try {
      const { userId, category, description, email } = req.body;

      const validationResult = Report.validate({
        userId,
        category,
        description,
        email,
      });
      if (!validationResult.isValid) {
        return res.status(400).json({ errors: validationResult.errors });
      }

      const newReport = new Report(userId, category, description, email);

      const reportRef = database.ref("reports").push();
      await reportRef.set(newReport.toJSON());


      res
        .status(201)
        .json({
          message: "Report submitted successfully",
          reportId: reportRef.key,
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getReports(req, res) {
    try {
      const reportsSnapshot = await database.ref("reports").once("value");
      const reports = reportsSnapshot.val() || {};

      const reportList = Object.values(reports);
      res.json(reportList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ReportController;