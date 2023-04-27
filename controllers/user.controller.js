import User from "@/models/User.model";
import bycrypt from "bcrypt"

const registerUser = async (data) => {

    let isExist = await User.findOne({ email: data.email });

    if (isExist) {
        throw new Error('Account Already Exist');
    }

    try {
        let resposne = await User.create(data);
        return { success: "Registration successful" }
    } catch (error) {
        throw new Error(error);
    }
}



export { registerUser }