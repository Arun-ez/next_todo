import User from "@/models/User.model";
import bycrypt from "bcrypt"
import jwt from "jsonwebtoken"

const CreateToken = (data) => {
    return jwt.sign({ name: data.name, email: data.email }, process.env.JWT_SECRET_KEY);
}

const registerUser = async (data) => {

    let isExist = await User.findOne({ email: data.email });

    if (isExist) {
        throw new Error('Account Already Exist');
    }

    return new Promise((resolve, reject) => {
        bycrypt.hash(data.password, 10, async (err, hashed) => {
            try {
                let resposne = await User.create({ ...data, password: hashed });
                resolve({ success: "Registration successful" })
            } catch (error) {
                reject(error);
            }
        })
    })
}

const loginUser = async (data) => {

    let user = await User.findOne({ email: data.email });

    if (!user) {
        throw new Error('No account found');
    }

    return new Promise((resolve, reject) => {
        bycrypt.compare(data.password, user.password, (err, valid) => {
            if (valid === true) {
                const token = CreateToken(user);
                resolve({ name: user.name, email: user.email, token: token });
            } else {
                reject({ message: "Password doesn't match" });
            }
        })
    })
}



export { registerUser, loginUser }