import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitFeedback } from "@/store/shop/feedback-slice";

const FeedbackForm = () => {
    const dispatch = useDispatch();
    const { feedbackResponse, isLoading, error } = useSelector(
        (state) => state.shoppingFeedback
    );

    const [suggestion, setSuggestion] = useState("");
    const [reason, setReason] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitFeedback({ userId: "12345", suggestion, reason }));
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">
                Feedback Form
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="suggestion"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        What product do you want?
                    </label>
                    <textarea
                        id="suggestion"
                        placeholder="Suggest a product"
                        value={suggestion}
                        onChange={(e) => setSuggestion(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label
                        htmlFor="reason"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Why do you want this product?
                    </label>
                    <textarea
                        id="reason"
                        placeholder="Reason for suggestion"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                >
                    {isLoading ? "Submitting..." : "Submit Feedback"}
                </button>
            </form>
            {feedbackResponse && (
                <p className="mt-4 text-green-600 font-medium">
                    Feedback submitted successfully!
                </p>
            )}
            {error && (
                <p className="mt-4 text-red-600 font-medium">
                    {error}
                </p>
            )}
        </div>
    );
};

export default FeedbackForm;
