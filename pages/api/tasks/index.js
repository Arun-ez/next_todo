import { TokenValidator } from "@/middlewares/TokenValidator";
import { getAllTasks, postTask } from "@/controllers/task.controller";
import CreateConnection from "@/middlewares/ConnectionCreator";

const get = async (req, res) => {
    let isValid = TokenValidator(req);

    if (isValid.hasOwnProperty('failed')) {
        return res.status(401).send(isValid);
    }

    try {
        let response = await getAllTasks(isValid.success);
        res.send(response);
    } catch (error) {
        res.status(400).send({ failed: error.message })
    }
}

const post = async (req, res) => {
    let isValid = TokenValidator(req);

    if (isValid.hasOwnProperty('failed')) {
        return res.status(401).send(isValid);
    }

    try {
        let response = await postTask(isValid.success, JSON.parse(req.body));
        res.send(response)
    } catch (error) {
        res.status(400).send({ failed: error.message })
    }
}

const handler = async (req, res) => {
    const { method } = req;
    await CreateConnection()

    if (method === 'GET') {
        get(req, res);
    } else if (method === 'POST') {
        post(req, res)
    }
}

export default handler;