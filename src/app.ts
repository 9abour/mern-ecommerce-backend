import express, { Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import { connectToMongoDB } from "./helpers/connectToMongoDB";

dotenv.config();

const PORT = process.env.PORT ? process.env.PORT : "";
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

connectToMongoDB().then(() => {
	console.log("connected to the database");
});

app.get("/", async (_, res: Response) => {
	res.send("Hello, World!");
});

app.listen(PORT, () => {
	console.log(`Server running on PORT -> ${PORT}`);
});
