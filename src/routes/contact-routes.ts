import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { saveContact, updateContact, deleteContact, getContacts } from "../database/contact-data-store";
import IContact from "../models/IContact";

const contactRouter = express.Router();

// Middleware to validate contactId
const validateContactId = (req: Request, res: Response, next: NextFunction): void => {
    const contactId = req.params.contactId;

    if (!contactId || !mongoose.Types.ObjectId.isValid(contactId)) {
        res.status(400).json({ message: "Invalid contact ID" });
        return;
    }

    next(); // Proceed to the next middleware/route handler
};

// Save a new contact
contactRouter.post("/save", async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(`req.body: ${JSON.stringify(req.body)}`);
        const contact = req.body;
        const response = await saveContact(contact);
        res.status(200).json({ message: "Contact saved successfully", data: response });
    } catch (e) {
        next(e); // Pass the error to the centralized error handler
    }
});

// Get all contacts
contactRouter.get("/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contacts = await IContact.find({});
        res.status(200).json(contacts);
    } catch (e) {
        next(e);
    }
});

// Get contacts for a specific user
contactRouter.get("/user/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const contacts = await getContacts(userId);
        res.status(200).json(contacts);
    } catch (e) {
        next(e);
    }
});

// Update a contact
contactRouter.put("/update/:contactId", validateContactId, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactId = req.params.contactId;
        const updatedData = req.body;
        const updatedContact = await updateContact(contactId, updatedData);
        res.status(200).json({ message: "Contact updated successfully", data: updatedContact });
    } catch (e) {
        next(e);
    }
});

// Delete a contact
contactRouter.delete("/delete/:contactId", validateContactId, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactId = req.params.contactId;
        const deletedContact = await deleteContact(contactId);
        res.status(200).json({ message: "Contact deleted successfully", data: deletedContact });
    } catch (e) {
        next(e);
    }
});

// Centralized error handler
contactRouter.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
});

export default contactRouter;