import mongoose from "mongoose";
import { Schema} from "mongoose";


const ObjectId = mongoose.ObjectId;
const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: String,
    name: String
})

const todoSchema = new Schema({
    title: String, 
    description: String,
    done: Boolean,
    userId: ObjectId
})

const userModel = mongoose.model("users", userSchema)
const todoModel = mongoose.model("todos", todoSchema)


export { userModel, todoModel }