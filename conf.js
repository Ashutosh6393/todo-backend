import dotenv from "dotenv";

dotenv.config();

const mongodbURL = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;
const port = process.env.PORT ;

export { mongodbURL, jwtSecret, port };
