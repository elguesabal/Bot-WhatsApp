import mongoose from "mongoose";

export default async function connectMongoDB() {
	try {
		await mongoose.connect(process.env.MONGO_URI);	
		console.log("deu bom")
	} catch (error) {
		console.log("deu ruim")
	}
}
