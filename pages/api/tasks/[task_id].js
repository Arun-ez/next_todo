
const get = (req, res) => {
    const { task_id } = req.query;
    res.send({ id: task_id, method: 'GET' });
}

const patch = (req, res) => {
    const { task_id } = req.query;
    res.send({ id: task_id, method: 'PATCH' });
}

const remove = (req, res) => {
    const { task_id } = req.query;
    res.send({ id: task_id, method: 'DELETE' });
}


const handler = (req, res) => {
    const { method } = req;

    if (method === 'GET') {
        get(req, res);
    } else if (method === 'PATCH') {
        patch(req, res);
    } else if (method === 'DELETE') {
        remove(req, res);
    }
}

export default handler;