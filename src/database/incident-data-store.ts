import IIncident from "../models/IIncident";
import {Incident} from "../models/Incident";
import {addUserIncident} from "./user-data-store";

export const saveIncident = async (incidentData: Incident) => {
    try {

        const incidentToSave = {
            ...incidentData,
            timestamp: incidentData.timestamp ? new Date(incidentData.timestamp) : new Date(),
        };
        const incident = await IIncident.create(incidentToSave)
        await addUserIncident(incidentData.user, incident._id);
        return incident
    } catch (error) {
        console.log(`Error saving incident: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to save incident.");
    }
};
export const getIncidents = async (userId: string) => {
    try {
        const incidents = await IIncident.find({user: userId});
        return incidents
    } catch (error) {
        console.log(`Error getting incidents: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to get incidents.");
    }
};
