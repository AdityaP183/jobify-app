import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

try {
	await mongoose.connect(process.env.MONGO_URL);
	const user = await User.findOne({ email: "adityaprasad1837@gmail.com" });
	const jobsJson = JSON.parse(
		await readFile(new URL("./mock_data.json", import.meta.url))
	);
	const jobs = jobsJson.map((job) => {
		return { ...job, createdBy: user._id };
	});
	await Job.deleteMany({ createdBy: user._id });
    await Job.create(jobs)
    console.log("successful")
} catch (error) {
    console.log(error)
    process.exit(1)
}
