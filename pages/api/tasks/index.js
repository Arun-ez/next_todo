

const get = (req, res) => {
    res.send('All Data');
}

const post = (req, res) => {
    res.send('Post Data');
}

const handler = (req, res) => {
    const { method } = req;

    if (method === 'GET') {
        get(req, res);
    } else if (method === 'POST') {
        post(req, res)
    }
}

export default handler;