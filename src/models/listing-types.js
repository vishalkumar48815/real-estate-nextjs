// models/listing-types.js
import mongoose from "mongoose";

const ListingTypesSchema = new mongoose.Schema({
    name: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { collection: 'listing-types' }); // 👈 exact MongoDB collection name

export default mongoose.models.ListingType || mongoose.model("ListingType", ListingTypesSchema);
