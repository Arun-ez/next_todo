import CreateConnection from "@/middlewares/ConnectionCreator";
import { registerUser } from "@/controllers/user.controller";


const handler = async (req, res) => {

    if (req.method !== 'POST') {
        return res.status(404).send({ error: "only post request is supported" })
    }

    try {
        let connection = await CreateConnection();
        let resposne = await registerUser(req.body);
        res.send(resposne);
    } catch (error) {
        res.status(400).send({ failed: error.message });
    }
}

export default handler;