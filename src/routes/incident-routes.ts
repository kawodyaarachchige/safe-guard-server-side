import express  from "express";
import {saveIncident} from "../database/incident-data-store";
import IIncident from "../models/IIncident";


let incidentRouter = express.Router();

incidentRouter.post("/save", async (req, res) => {
    try{
        let incident = req.body;
        let response = await saveIncident(incident);
        res.status(200).json({ message: "Incident saved successfully" });
    }catch (e) {
        console.log("error : ", e);
    }
});

incidentRouter.get("/all", async (req, res) => {
    try{
        let incidents = await IIncident.find({});
        res.status(200).json(incidents);
    }catch (e) {
        console.log("error : ", e);
    }
});

export default incidentRouter;