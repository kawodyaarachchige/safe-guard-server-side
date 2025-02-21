import express  from "express";
import {saveCycle} from "../database/cycle-data-store";

let cycleRoutes = express.Router();

cycleRoutes.post("/save", async (req, res) => {
    try{
        let cycle = req.body;
        let response = await saveCycle(cycle);
        res.status(200).json({ message: "Cycle saved successfully" });
    }catch (e) {
        console.log("error : ", e);
    }
});

export default cycleRoutes;
