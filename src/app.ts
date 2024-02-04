import express, {Response, Request} from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();

const PORT = process.env.PORT ? process.env.PORT : 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!")
})

app.listen(PORT, () => {
    console.log(`Server running on PORT -> ${PORT}`);
});
