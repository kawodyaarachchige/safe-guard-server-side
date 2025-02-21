import mongoose, { Schema, Document } from "mongoose";

export interface IIncident extends Document {
    id : string
    user: mongoose.Schema.Types.ObjectId;
    type: string;
    description: string;
    location: {
        latitude: number;
        longitude: number;
    };
    timestamp: string;
}

let incidentSchema = new Schema({
    id: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    type: {type: String, required: true},
    description: {type: String, required: true},
    location: {
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true}
    },
    timestamp: {type: String, required: true}
});

export default mongoose.model<IIncident>('Incident', incidentSchema);
