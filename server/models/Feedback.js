const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
    {
        suggestion: {
            type: String,
            required: true,
            maxlength: 500,
        },
        reason: {
            type: String,
            maxlength: 1000,
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        }, // Timestamp of when the feedback was submitted
    }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);