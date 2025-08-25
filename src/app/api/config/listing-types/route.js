import ListingType from "../../../../models/listing-types"
import { NextResponse } from "next/server"
import connectDB from "../../../../lib/mongodb"

const GET = async () => {
    try {
        await connectDB();
        
        const listingTypes = await ListingType.find({}).lean();
        
        if(listingTypes.length === 0){
            return NextResponse.json({error: "No listing types found"}, {status: 404});
        }
        
        return NextResponse.json(listingTypes);
    } catch (error) {
        console.error("Error fetching listing types:", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}

export { GET };