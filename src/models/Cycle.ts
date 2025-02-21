export enum FlowStatus {
    Light = "LIGHT",
    Medium = "MEDIUM",
    Heavy = "HEAVY",
}

export class Cycle {
    startDate: Date;
    endDate: Date;
    symptoms: string[];
    notes: string;
    flow: FlowStatus;
    user: string;

    constructor(
        startDate: Date,
        endDate: Date,
        symptoms: string[],
        notes: string,
        user: string,
        flow: FlowStatus
    ) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.symptoms = symptoms;
        this.notes = notes;
        this.user = user;
        this.flow = flow;
    }
}