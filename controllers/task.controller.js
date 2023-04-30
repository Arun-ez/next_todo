import { v4 as uuid } from "uuid"
import User from "@/models/User.model"

const task_data_handler = async (data, tasks) => {
    try {
        let resposne = await User.updateOne({ email: data.email }, { $set: { todos: tasks } });
        return { success: resposne }
    } catch (error) {
        throw new Error(error);
    }
}

const getAllTasks = async (data) => {
    try {
        let resposne = await User.findOne({ email: data.email });
        return { data: resposne.todos };
    } catch (error) {
        throw new Error(error);
    }
}

const postTask = async (data, payload) => {

    if (!payload.hasOwnProperty('title') || !payload.hasOwnProperty('description') || !payload.hasOwnProperty('status')) {
        throw new Error("missing required field title or description or status");
    }

    try {
        let resposne = await getAllTasks(data);
        const tasks = resposne.data;
        tasks.push({ ...payload, id: uuid() });
        let repost_response = await task_data_handler(data, tasks);
        return { success: payload };
    } catch (error) {
        throw new Error(error);
    }
}

const getTaskById = (tasks, id) => {

    let result = tasks.find((elm) => {
        return elm.id === id
    })

    return { data: result }
}

const patchTaskById = async (data, tasks, id, payload) => {

    let updated = {}

    let result = tasks.map((elm, idx) => {

        if (elm.id !== id) {
            return elm;
        }

        updated = { ...elm, ...payload };

        return updated;
    })

    try {
        let response = await task_data_handler(data, result);
        return { success: updated }
    } catch (error) {
        throw new Error(error);
    }

}

const deleteTaskById = async (data, tasks, id) => {

    let result = tasks.filter((elm) => {
        return elm.id !== id;
    })

    try {
        let response = await task_data_handler(data, result);
        return { success: id }
    } catch (error) {
        throw new Error(error);
    }
}

export { getAllTasks, postTask, getTaskById, patchTaskById, deleteTaskById }