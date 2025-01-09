import Hospital from "../models/Hospital.js";

export const getHospitalsNearLocation = async (req, res) => {
    const { longitude, latitude, radius } = req.body;

    // Validate the inputs
    if (!longitude || !latitude) {
        return res.status(400).json({ message: "Longitude and latitude are required in the query parameters." });
    }

    try {
        // Convert radius to kilometers
        const radiusInKm = parseFloat(radius) / 6371; // Earth's radius in km

        const hospitals = await Hospital.find({
            "address.longitude": { $exists: true },
            "address.latitude": { $exists: true },
            $expr: {
                $let: {
                    vars: {
                        distance: {
                            $sqrt: {
                                $add: [
                                    { $pow: [{ $subtract: ["$address.longitude", parseFloat(longitude)] }, 2] },
                                    { $pow: [{ $subtract: ["$address.latitude", parseFloat(latitude)] }, 2] }
                                ]
                            }
                        }
                    },
                    in: { $lte: ["$$distance", radiusInKm] }
                }
            }
        });

        if (hospitals.length === 0) {
            return res.status(404).json({ message: "No hospitals found within the specified radius." });
        }

        res.status(200).json(hospitals);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving hospitals.", error: error.message });
    }
};
