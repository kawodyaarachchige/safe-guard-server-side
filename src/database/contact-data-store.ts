import {Contact} from "../models/Contact";
import IContact from "../models/IContact";
import {addUserContact} from "./user-data-store";



export const saveContact = async (contactData: Contact) => {
    try {
        const contact = await IContact.create(contactData);
        await addUserContact(contactData.user, contact._id);
        return contact;
    } catch (error) {
        console.log(`Error saving contact: ${error}`);
        throw error instanceof Error ? error : new Error("Failed to save contact.");
    }
}