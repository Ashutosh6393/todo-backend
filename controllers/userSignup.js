
import { userModel } from "../models/schema.js";
export const userSignup = async (req, res)=>{
    const {email, password, name} = req.body;
    try {
        const userExists = await userModel.findOne({ email: email });
        if(userExists){
            return res.status(400).json({ message: "User already exists" });
        }

        // hash the password
        await userModel.create({
            email,
            password,
            name
        })

        res.status(201).json({ message: "User created successfully" });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}