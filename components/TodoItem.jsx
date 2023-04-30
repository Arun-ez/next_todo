import React, { useState } from 'react'
import styles from "../styles/Todoitem.module.css"
import { CiEdit } from "react-icons/ci"
import { MdDeleteOutline } from "react-icons/md"

const TodoItem = ({ data, toggle_status, remove_todo }) => {

    return (
        <div className={styles.todoitem}>

            <div>
                <div className={styles.title_wrapper}>
                    <h3> {data.title} </h3>
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
                <button> <CiEdit fontSize="20px" /> </button>
                <button onClick={() => { remove_todo(data) }}> <MdDeleteOutline fontSize="20px" /> </button>
            </div>

        </div>
    )
}

export { TodoItem }


