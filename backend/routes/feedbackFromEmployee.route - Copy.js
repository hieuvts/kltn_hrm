const express = require("express");
const router = express.Router();
const feedbackFromEmployeeControllers = require("../controllers/feedbackFromEmployee.controller");

// Router-level middleware
router.get("/getAll",feedbackFromEmployeeControllers.getAllFeedbackFromEmployee);
router.param("FeedbackFromEmployeeId",feedbackFromEmployeeControllers.getFeedbackFromEmployeeById);
// router.get("/FeedbackFromEmployee/:FeedbackFromEmployeeId",feedbackFromEmployeeControllers.getOneFeedbackFromEmployee);
router.post("/create",feedbackFromEmployeeControllers.createFeedbackFromEmployee);
router.delete("/:FeedbackFromEmployeeId/delete",feedbackFromEmployeeControllers.deleteFeedbackFromEmployee);
router.delete("/deleteall",feedbackFromEmployeeControllers.deleteAllFeedbackFromEmployee);
router.put("/:FeedbackFromEmployeeId/put",feedbackFromEmployeeControllers.putFeedbackFromEmployee);
// router.post("/FeedbackFromEmployee/createmultipleFeedbackFromEmployee",feedbackFromEmployeeControllers.createMultipleFeedbackFromEmployee);

module.exports = router;