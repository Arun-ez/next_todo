import { TokenValidator } from "@/middlewares/TokenValidator";
import CreateConnection from "@/middlewares/ConnectionCreator";
import { getAllTasks, getTaskById, patchTaskById, deleteTaskById } from "@/controllers/task.controller";

const get = async (req, res) => {
    const { task_id } = req.query;

    let isValid = TokenValidator(req);

    if (isValid.hasOwnProperty('failed')) {
        return res.status(401).send(isValid);
    }

    try {
        let tasks = await getAllTasks(isValid.success);
        let response = getTaskById(tasks.data, task_id);
        res.send(response);
    } catch (error) {
        res.status(400).send({ failed: error.message })
    }
}

const patch = async (req, res) => {
    const { task_id } = req.query;
    let isValid = TokenValidator(req);

    if (isValid.hasOwnProperty('failed')) {
        return res.status(401).send(isValid);
    }

    try {
        let tasks = await getAllTasks(isValid.success);
        let response = await patchTaskById(isValid.success, tasks.data, task_id, JSON.parse(req.body));
        res.send(response);
    } catch (error) {
        res.status(400).send({ failed: error.message })
    }
}

const erase = async (req, res) => {
    const { task_id } = req.query;
    let isValid = TokenValidator(req);

    if (isValid.hasOwnProperty('failed')) {
        return res.status(401).send(isValid);
    }

    try {
        let tasks = await getAllTasks(isValid.success);
        let response = deleteTaskById(isValid.success, tasks.data, task_id);
        res.send(response);
    } catch (error) {
        res.status(400).send({ failed: error.message })
    }
}


const handler = async (req, res) => {
    const { method } = req;
    await CreateConnection()

    if (method === 'GET') {
        get(req, res);
    } else if (method === 'PATCH') {
        patch(req, res);
    } else if (method === 'DELETE') {
        erase(req, res);
    } else {
        res.status(400).send({ failed: `${req.method} is not supported in this route` })
    }
}

export default handler;