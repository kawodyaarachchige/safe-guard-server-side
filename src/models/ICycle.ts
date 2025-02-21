import mongoose,{Schema,Document} from "mongoose";


export enum FlowStatus {
    Light = "LIGHT",
    Medium = "MEDIUM",
    Heavy = "HEAVY",
}

export interface ICycle extends Document {
    startDate: Date;
    endDate: Date;
    symptoms: string[];
    notes: string;
    flow: FlowStatus;
    user: mongoose.Schema.Types.ObjectId
}
let  CycleSchema = new Schema<ICycle>({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    symptoms: { type: [String], required: true },
    notes: { type: String, required: false },
    flow: {
        type: String,
        enum: Object.values(FlowStatus), // Ensure enum values are recognized
        required: true,
    },
    user: { type: String, required: true },
});
export default mongoose.model<ICycle>('Cycle', CycleSchema);
