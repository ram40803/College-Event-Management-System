const express = require("express");
const {
  registerUser,
  getAllRegistrations,
  getRegistrationsByUser,
  deleteRegistration,
} = require("../controllers/registrationController.js");

const router = express.Router();

router.post("/", registerUser);
router.get("/", getAllRegistrations);
router.get("/user/:userId", getRegistrationsByUser);
router.delete("/:id", deleteRegistration);

module.exports = router;
