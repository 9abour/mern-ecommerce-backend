import mongoose from "mongoose";

/**
 * Connects to the MongoDB database using the provided URI.
 *
 * @return {Promise<void>} A promise that resolves once the connection is established, or rejects with an error.
 */
export const connectToMongoDB = async () => {
    const uri = process.env.MONGODB_URI || "";

    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.error("MongoDB connection error:", (error as Error).message);
    }
}
