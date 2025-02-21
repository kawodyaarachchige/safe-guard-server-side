import {Cycle} from "../models/Cycle";
import ICycle from "../models/ICycle";
import {addUserCycle} from "./user-data-store";


export const saveCycle = async (cycleData: Cycle) => {
    try {
        const cycle = await ICycle.create(cycleData);
        await addUserCycle(cycleData.user, cycle._id);
        return cycle;
    }catch (error) {
        console.log(`Error saving cycle: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to save cycle.");
    }
}