import express, {Response} from "express"
import dotenv from "dotenv"
import cors from "cors"
import {connectToMongoDB} from "./helpers/connectToMongoDB";

dotenv.config();

const PORT = process.env.PORT ? process.env.PORT : "";
const app = express();

app.use(express.json());
app.use(cors());

connectToMongoDB().then(() => {
    console.log("connected to the database");
});

app.get("/", (_, res: Response) => {
    res.send("Hello, World!")
});

app.listen(PORT, () => {
    console.log(`Server running on PORT -> ${PORT}`);
});
