import jwt from "jsonwebtoken";

const Verify = (token) => {
    try {
        const validity = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return {
            success: { name: validity.name, email: validity.email, token: token }
        }
    } catch (error) {
        return {
            error: error.message
        }
    }
}

const TokenValidator = (req) => {

    if (!req.headers.hasOwnProperty('authorization')) {
        return {
            failed: "Token not provided"
        }
    }

    const [type, token] = req.headers.authorization.split(" ");

    if (type !== "Bearer") {
        return {
            failed: "token type is not Bearer"
        }
    }

    const isValid = Verify(token);

    if (isValid.hasOwnProperty('error')) {
        return {
            failed: "Invalid token"
        }
    }

    return {
        success: isValid.success
    }
}

export { TokenValidator }