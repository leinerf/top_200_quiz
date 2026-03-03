import express from "express";
import axios from "axios";

const viewRouter = express.Router();
const api = axios.create({
    baseURL: (process.env.BASE_URL || "http://localhost:3000") + "/api"
})

viewRouter.get("/", async(req, res) => {
    const response = await api.get("/drugs");
    const drugs = response.data
    res.render("index.ejs", { drugs });
})

viewRouter.get("/brands", async(req, res) => {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;
    const params = [
        "offset=" + offset,
        "limit=" + limit
    ];
    const response = await api.get("/brands" + "?" + params.join("&"));
    const { drugs, total } = response.data
    drugs.forEach(element => {
        element.randomAttributes = element.randomAttributes.join("|")
    });
    return res.render("form.ejs", { drugs, type: "generic", tab: "brand", total })
})

viewRouter.get("/generics", async(req, res) => {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;
    const params = [
        "offset=" + offset,
        "limit=" + limit
    ];
    const response = await api.get("/generics" + "?" + params.join("&"));
    const { drugs, total } = response.data
    drugs.forEach(element => {
        element.randomAttributes = element.randomAttributes.join("|")
    });
    return res.render("form.ejs", { drugs, type: "brand", tab: "generic", total })
})

viewRouter.get("/classifications", async(req, res) => {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;
    const params = [
        "offset=" + offset,
        "limit=" + limit
    ];
    const response = await api.get("/classifications" + "?" + params.join("&"));
    const { drugs, total } = response.data
    drugs.forEach(element => {
        element.randomAttributes = element.randomAttributes.join("|")
    });
    return res.render("form.ejs", { drugs, type: "classification", tab: "classification", total })
})

viewRouter.get("/usage", async(req, res) => {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;
    const params = [
        "offset=" + offset,
        "limit=" + limit
    ];
    const response = await api.get("/indications" + "?" + params.join("&"));
    const { drugs, total } = response.data
    drugs.forEach(element => {
        element.randomAttributes = element.randomAttributes.join("|")
    });
    return res.render("form.ejs", { drugs, type: "usage", tab: "usage", total })
})

export default viewRouter;