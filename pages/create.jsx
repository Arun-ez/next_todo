import { useRouter } from 'next/router';
import styles from '../styles/Create.module.css'
import { useState, useEffect, useRef } from 'react';

const Create = () => {

    const router = useRouter();
    const [error, set_error] = useState("");
    const [status_class, set_status_class] = useState("")
    const status_ref = useRef(null);



    const post_task = async (data) => {
        try {
            let response = await fetch('/api/tasks', {
                method: "POST",
                body: JSON.stringify(data),
                headers: { authorization: `Bearer ${localStorage.getItem('nexttodo_token')}` }
            })

            set_status_class(styles.success);
            status_ref.current.textContent = "Task Added"
            setTimeout(() => { set_status_class("") }, 1500)
        } catch (error) {
            set_status_class(styles.failed);
            status_ref.current.textContent = error.message;
            setTimeout(() => { set_status_class("") }, 1500)
        }
    }

    const create = (event) => {
        event.preventDefault();
        const { title, desc } = event.target;
        const data = { title: title.value, description: desc.value, status: false }

        if (!data.title && !data.description) {
            set_error("Title and Description not provided")
            return
        } else if (!data.title) {
            set_error("Title not provided")
            return
        } else if (!data.description) {
            set_error("Description not provided");
            return
        }

        set_error("");

        if (localStorage.getItem('nexttodo_token')) {
            post_task(data);
            event.target.reset();
        } else {
            router.push({ pathname: "/account" });
        }
    }

    useEffect(() => {
        document.title = "Create New Task"
    }, [])

    return (
        <div className={styles.create}>

            <h1> Create a new task </h1>

            <h3 ref={status_ref} className={`${styles.status} ${status_class}`}> </h3>

            <form className={styles.form} onSubmit={create}>
                <input name="title" type="text" placeholder="Title" className={styles.input} />
                <input name="desc" type="text" placeholder="Description" className={styles.input} />
                <small> {error} </small>
                <input type="submit" value="Create" className={styles.button} />
            </form>
        </div>
    )
}

export default Create;
