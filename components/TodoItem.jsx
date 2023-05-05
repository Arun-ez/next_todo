import { useState } from 'react'
import styles from "../styles/Todoitem.module.css"
import { CiEdit } from "react-icons/ci"
import { MdDeleteOutline } from "react-icons/md"

const TodoItem = ({ data, toggle_status, edit_todo, remove_todo }) => {

    const [edit_phase, set_edit_phase] = useState(false);

    const [title, set_title] = useState(data.title);
    const [desc, set_desc] = useState(data.description);
    const [error, set_error] = useState("");

    const form_handler = (event) => {
        event.preventDefault();
        const { title, desc } = event.target;
        const form_data = { title: title.value, description: desc.value }

        if (!form_data.title && !form_data.description) {
            set_error("Title and Description not provided")
            return
        } else if (!form_data.title) {
            set_error("Title not provided")
            return
        } else if (!form_data.description) {
            set_error("Description not provided");
            return
        }

        edit_todo(form_data, data.id);
        set_edit_phase(false);
    }

    return (
        <div className={`${styles.todoitem} ${styles.item_incoming_anim}`}>

            {edit_phase === true ?

                <>
                    <form className={styles.form} onSubmit={form_handler}>
                        <input
                            name="title"
                            value={title}
                            onChange={(event) => { set_title(event.target.value) }}
                            type="text"
                            placeholder="Title"
                            className={styles.input}
                        />

                        <input
                            name="desc"
                            value={desc}
                            onChange={(event) => { set_desc(event.target.value) }}
                            type="text"
                            placeholder="Description"
                            className={styles.input}
                        />
                        <small> {error} </small>
                        <input type="submit" value="Done" className={styles.button} />
                    </form>
                </>

                :

                <>
                    <div>
                        <div className={styles.title_wrapper}>
                            <h4> {data.title} </h4>
                            <p> - {data.status ? "Done" : "Pending..."} </p>
                        </div>

                        <p> {data.description} </p>

                        <div
                            className={`${styles.status_check} ${data.status === true ? styles.status_check_active : styles.status_check_inactive}`}
                            onClick={() => { toggle_status(data) }}
                        >
                            <div className={`${styles.circle} ${data.status === true ? styles.circle_active : styles.circle_inactive}`}>

                            </div>
                        </div>

                    </div>

                    <div className={styles.buttons}>
                        <button onClick={() => { set_edit_phase(true) }}> <CiEdit fontSize="20px" /> </button>
                        <button onClick={() => { remove_todo(data) }}> <MdDeleteOutline fontSize="20px" /> </button>
                    </div>
                </>
            }

        </div>
    )
}

export { TodoItem }


