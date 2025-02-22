import { EmergencyModel, IContact, IEmergency } from "../models/IEmergency";

class EmergencyDataStore {


    // Update the user's last known location
    async updateLocation(userId: string, latitude: number, longitude: number) {
        return EmergencyModel.findOneAndUpdate(
            { userId },
            { lastLocation: { latitude, longitude } },
            { new: true }
        );
    }

    // Toggle panic mode for the user
    async togglePanicMode(userId: string) {
        const emergencyData = await EmergencyModel.findOne({ userId });
        if (emergencyData) {
            emergencyData.panicMode.active = !emergencyData.panicMode.active;
            return emergencyData.save();
        }
        throw new Error('Emergency data not found for the user');
    }

    // Set recording status for panic mode
    async setRecording(userId: string, recording: boolean) {
        return EmergencyModel.findOneAndUpdate(
            { userId },
            { 'panicMode.recording': recording },
            { new: true }
        );
    }

    // Get emergency data for a user
    async getEmergencyData(userId: string) {
        return EmergencyModel.findOne({ userId });
    }
}

export default new EmergencyDataStore();