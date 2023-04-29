import CreateConnection from "@/middlewares/ConnectionCreator";
import { loginUser } from "@/controllers/user.controller";

const handler = async (req, res) => {

    if (req.method !== 'POST') {
        return res.status(404).send({ error: "only post request is supported" })
    }

    try {
        let connection = await CreateConnection();
        let resposne = await loginUser(req.body);
        res.send(resposne);
    } catch (error) {
        res.status(400).send({ failed: error.message });
    }
}

export default handler;