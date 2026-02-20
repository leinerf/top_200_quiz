import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createGenericDrugQuestions } from "./modules/drugs.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const _dirname = dirname(fileURLToPath(
    import.meta.url));

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.get("/drugs", (req, res) => {
    res.json(createGenericDrugQuestions(0, 100))
})

app.get("/", (req, res) => {
    res.sendFile(_dirname + "/public/views/index.html")
})

app.listen(3000, () => {
    console.log("listening on http://localhost:3000")
})