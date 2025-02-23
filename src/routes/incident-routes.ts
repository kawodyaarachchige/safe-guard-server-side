import express, {NextFunction, Request, Response} from "express";
import {deleteIncident, getAllIncidents, saveIncident, updateIncident} from "../database/incident-data-store";
import IIncident from "../models/IIncident";
import {updateContact} from "../database/contact-data-store";
import mongoose from "mongoose";


let incidentRouter = express.Router();

const validateIncidentId = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const incidentId = req.params.incidentId;
    if (!incidentId || !mongoose.Types.ObjectId.isValid(incidentId)) {
        return res.status(400).json({ message: "Incident ID is required" });
    }
    next();
}

incidentRouter.post("/save", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const incident = req.body;
        const response = await saveIncident(incident);

        res.status(200).json({ message: "Incident saved successfully" });
    }catch (e) {
        console.log("error : ", e);
    }
});

incidentRouter.get("/all", async (req, res) => {
    try{
        let incidents = await getAllIncidents();
        res.status(200).json(incidents);
    }catch (e) {
        console.log("error : ", e);
    }
});
incidentRouter.put("/update/:incidentId", async (req, res) => {
    try{
        const incidentId = req.params.incidentId;
        const updatedData = req.body;
        const updatedIncident = await updateIncident(incidentId, updatedData);
        res.status(200).json({ message: "Incident updated successfully", data: updatedIncident });
    }catch (e) {
        console.log("error : ", e);
    }
})

incidentRouter.delete("/delete/:incidentId", async (req, res) => {
    try{
        const incidentId = req.params.incidentId;
        const deletedIncident = await deleteIncident(incidentId);
        res.status(200).json({ message: "Incident deleted successfully", data: deletedIncident });
    }catch (e) {
        console.log("error : ", e);
    }
})

export default incidentRouter;