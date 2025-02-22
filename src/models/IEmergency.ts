import mongoose, { Document, Schema,Types } from 'mongoose';

export interface IContact {
    _id?: Types.ObjectId;
    name: string;
    phone: string;
    email: string;
    relationship: string;
    isEmergencyContact: boolean;
    isFavorite: boolean;
    user: string; // Reference to the user who owns this contact
}

export interface IEmergency extends Document {
    userId: string; // To associate emergencies with a specific user
    contacts: IContact[];
    lastLocation: {
        latitude: number;
        longitude: number;
    };
    panicMode: {
        active: boolean;
        recording: boolean;
    };
}

const ContactSchema: Schema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    relationship: { type: String, required: true },
    isEmergencyContact: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false },
    user: { type: String, required: true }, // Reference to the user
});

const EmergencySchema: Schema = new Schema({
    userId: { type: String, required: true },
    contacts: [ContactSchema],
    lastLocation: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    panicMode: {
        active: { type: Boolean, default: false },
        recording: { type: Boolean, default: false },
    },
});

// Export the Mongoose model
export const EmergencyModel = mongoose.model<IEmergency>('Emergency', EmergencySchema);