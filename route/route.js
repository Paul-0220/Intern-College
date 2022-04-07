const express = require("express");
const router = express.Router();
const collegeController = require("../controller/collegeController");
const internController = require("../controller/internController");

router.post("/createCollege", collegeController.createCollege);
router.post("/Intern", internController.createIntern);

router.get("/getCollege", collegeController.collegedetails);

module.exports = router;
