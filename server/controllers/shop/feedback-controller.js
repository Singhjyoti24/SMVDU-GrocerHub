const Feedback = require("../../models/Feedback");

const submitFeedback = async (req, res) => {
    try {
        const { userId, suggestion, reason } = req.body;

        if (!suggestion || suggestion.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Suggestion is required!",
            });
        }

        const feedback = new Feedback({
            userId,
            suggestion,
            reason,
        });

        await feedback.save();

        res.status(201).json({
            success: true,
            message: "Feedback submitted successfully!",
            data: feedback,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error submitting feedback!",
        });
    }
};

const fetchAllFeedback = async (req, res) => {
    try {
        const feedbackList = await Feedback.find()
            .sort({ submittedAt: -1 })
            .populate("userId", "name email");
        res.status(200).json({
            success: true,
            data: feedbackList,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching feedback!",
        });
    }
};

module.exports = {
    submitFeedback,
    fetchAllFeedback,
};
