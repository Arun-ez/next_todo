import mongoose, { trusted } from "mongoose";

const CreateConnection = async () => {

    if (mongoose.connection.readyState) {
        return true;
    }

    try {
        let response = await mongoose.connect(process.env.MONGO_URI);
        return true;
    } catch (error) {
        throw new Error(error);
    }
}


export default CreateConnection;