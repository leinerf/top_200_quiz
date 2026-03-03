import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import router from "./routes/api/index.js";
import viewRouter from "./routes/views/index.js";

const _dirname = dirname(fileURLToPath(
    import.meta.url));

const app = express();

app.use(express.static("public"))
app.use(cors());

app.use("/api", router);
app.use("/", viewRouter)

app.listen(3000, () => {
    const url = process.env.BASE_URL || "http://localhost:3000"
    console.log(`listening on ${url}`);
})