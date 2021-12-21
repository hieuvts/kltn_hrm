const express = require("express");
const router = express.Router();
const feedbackFromEmployeeControllers = require("../controllers/FeedbackFromEmployee.controller");

// Router-level middleware
router.param("FeedbackFromEmployeeId",feedbackFromEmployeeControllers.getFeedbackFromEmployeeById);
// router.get("/FeedbackFromEmployee/:FeedbackFromEmployeeId",feedbackFromEmployeeControllers.getOneFeedbackFromEmployee);
router.get("/getAll",feedbackFromEmployeeControllers.getAllFeedbackFromEmployee);
router.post("/create",feedbackFromEmployeeControllers.createFeedbackFromEmployee);
router.delete("/:FeedbackFromEmployeeId/delete",feedbackFromEmployeeControllers.deleteFeedbackFromEmployee);
router.patch("/deleteall",feedbackFromEmployeeControllers.deleteAllFeedbackFromEmployee);
router.put("/:FeedbackFromEmployeeId/put",feedbackFromEmployeeControllers.putFeedbackFromEmployee);
// router.post("/FeedbackFromEmployee/createmultipleFeedbackFromEmployee",feedbackFromEmployeeControllers.createMultipleFeedbackFromEmployee);

module.exports = router;