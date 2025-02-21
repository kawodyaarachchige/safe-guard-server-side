import express   from "express";
import {saveContact} from "../database/contact-data-store";


let contactRouter = express.Router();

contactRouter.post("/save", async (req, res) => {
    try{
        let contact = req.body;
        let response = await saveContact(contact);
        res.status(200).json({ message: "Contact saved successfully" });
    }catch (e) {
        console.log("error : ", e);
    }
});

export default contactRouter;