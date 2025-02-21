import express, { Request, Response } from 'express';
import dotenv from "dotenv"
import cors from 'cors';
import mongoose from "mongoose";
import userRouter from "./routes/user-routes";
import incidentRouter from "./routes/incident-routes";
import contactRouter from "./routes/contact-routes";
import locationRouter from "./routes/location-routes";

const app = express();
const port = 5002;

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(()=>{
        console.log("connected to DB")
    })
    .catch((err)=>{
        console.log(err)
    })


app.use("/api/user",userRouter);
app.use("/api/incident",incidentRouter);
app.use("/api/contact",contactRouter);
app.use("/api/location",locationRouter);

/*
// Mock database
let users: User[] = [];
let incidents: Incident[] = [];

app.get('/', (req: Request, res: Response) => {
    res.send('Emergency Alert Backend is running!');
});

// Login endpoint
app.post('/api/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Hardcoded valid credentials for testing
    const validEmail = 'test@example.com';
    const validPassword = 'password';

    if (email === validEmail && password === validPassword) {
        res.json({
            id: '1',
            name: 'Tharu Arachchige',
            email,
        });
    } else {
        res.status(400).json({ error: 'Invalid credentials' });
    }
});
//get users
app.get('/api/users', async (req: Request, res: Response) => {
    await delay(1000); // Simulate API call
    res.json(users);
});

// Signup endpoint
app.post('/api/signup', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    await delay(1000); // Simulate API call
    if (name && email && password) {
        const user: User = {
            id: Date.now().toString(),
            name,
            email,
        };
        users.push(user);
        res.json(user);
    } else {
        res.status(400).json({ error: 'Failed to create account' });
    }
});
*/

/*// Send emergency alert endpoint
app.post('/api/sendEmergencyAlert', async (req: Request, res: Response) => {
    const alert: EmergencyAlert = req.body;
    await delay(1000); // Simulate API call
    console.log('Emergency alert sent:', alert);
    res.status(200).send();
});

// Report incident endpoint
app.post('/api/reportIncident', async (req: Request, res: Response) => {
    const data: Partial<Incident> = req.body;
    await delay(1000); // Simulate API call
    const incident: Incident = {
        id: Date.now().toString(),
        type: data.type || '',
        description: data.description || '',
        location: data.location || { latitude: 0, longitude: 0 },
        timestamp: new Date().toISOString(),
    };
    incidents.push(incident);
    res.json(incident);
});*/

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Simulated delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));