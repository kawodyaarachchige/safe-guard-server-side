import IUser from "../models/IUser";
import {User} from "../models/User";

export const registerUser = async (user: User) => {
    try{
        const fetchedUser = await IUser.findOne({email: user.email});

        if (!fetchedUser) {
            const newUser = new User(user.email,user.name,user.password, user.incidents);
            await IUser.create(newUser);
            return newUser;

        } else {
           throw new Error('User already exists');
        }
    }catch (error) {
        throw error instanceof Error ? error : new Error('Failed to register user');
    }
}

export const loginUser = async (user:User) => {
    try{
        const fetchedUser = await IUser.findOne({email: user.email});
        if (fetchedUser && fetchedUser.password === user.password) {
            return fetchedUser;
        } else {
            throw new Error('Invalid credentials');
        }
    }catch (error) {
        throw error instanceof Error ? error : new Error('Failed to login user');
    }
}


