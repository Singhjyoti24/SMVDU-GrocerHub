const Feature = require("../../models/Feature")


const addFeatureImage = async (req, res) => {
    try {
        const { image } = req.body;

        const featureImage = new Feature({
            image
        })

        await featureImage.save();

        res.status(200).json({
            success: true,
            data: featureImage
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
}

const getFeatureImage = async (req, res) => {
    try {
        const image = await Feature.find({})
        res.status(200).json({
            success: true,
            data: image
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
}

module.exports = {addFeatureImage, getFeatureImage}