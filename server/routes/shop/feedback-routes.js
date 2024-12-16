const express = require("express");

const {
    submitFeedback
} = require("../../controllers/shop/feedback-controller");

const router = express.Router();

router.post("/submit", submitFeedback);

module.exports = router;