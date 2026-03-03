import drugs from "../../utils/drugs.js";
import express from "express";

const router = express.Router();
const drugSet = drugs();

router.get("/drugs", (req, res) => {
    const result = drugSet.getDrugs();
    result.total = drugSet.getTotalDrugs();
    return res.json(result);
})

router.get("/brands", (req, res) => {
    const offset = parseInt(req.query.offset) || 0
    const limit = parseInt(req.query.limit) || 20
    const drugs = drugSet.quizBrands(offset, limit);
    const total = drugSet.getTotalDrugs();
    return res.json({ drugs, total });
})

router.get("/generics", (req, res) => {
    const offset = parseInt(req.query.offset) || 0
    const limit = parseInt(req.query.limit) || 20
    const drugs = drugSet.quizGenerics(offset, limit);
    const total = drugSet.getTotalDrugs();
    return res.json({ drugs, total });
})

router.get("/classifications", (req, res) => {
    const offset = parseInt(req.query.offset) || 0
    const limit = parseInt(req.query.limit) || 20
    const drugs = drugSet.quizClassifications(offset, limit);
    const total = drugSet.getTotalDrugs();
    return res.json({ drugs, total });
})

router.get("/indications", (req, res) => {
    const offset = parseInt(req.query.offset) || 0
    const limit = parseInt(req.query.limit) || 20
    const drugs = drugSet.quizIndications(offset, limit);
    const total = drugSet.getTotalDrugs();
    return res.json({ drugs, total });
})

export default router;