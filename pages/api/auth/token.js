import { TokenValidator } from "@/middlewares/TokenValidator";

const handler = (req, res) => {

    if (req.method !== 'POST') {
        return res.status(404).send({ error: "only post request is supported" })
    }

    let isValid = TokenValidator(req);

    if (isValid.hasOwnProperty('failed')) {
        return res.status(401).send(isValid);
    }

    return res.send(isValid)
}

export default handler;