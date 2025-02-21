import express from "express";
import {loginUser, registerUser} from "../database/user-data-store";


let userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    try{
        let user = req.body;
        let response = await registerUser(user);
        res.send("User registered successfully");
    }catch (e) {
        console.log("error : ", e);
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        let user = req.body;
        let response = await loginUser(user);
        const filteredResponse = {
            id: response._id,
            email: response.email,
            name: response.name
        };

        res.status(200).send(filteredResponse);
    } catch (e) {
        console.log("error : ", e);
    }
});

export default userRouter;