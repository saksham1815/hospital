import mongoose from "mongoose";
const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: {
        city: { type: String, required: true },
        longitude: { type: Number, required: true },
        latitude: { type: Number, required: true }
    },
    specialities: [
        {
            doctorName: { type: String, required: true },
            speciality: { type: String, required: true },
            contactNumber: { type: String, required: true }
        }
    ]
});

const Hospital = mongoose.model('Hospital',hospitalSchema);
export default Hospital;
