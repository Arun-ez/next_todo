import styles from '../styles/Create.module.css'
import { useEffect } from 'react';

const Create = () => {

    useEffect(() => {
        document.title = "Create New Task"
    }, [])

    return (
        <div className={styles.create}>

            <h1> Create a new task </h1>

            <form className={styles.form}>
                <input type="text" placeholder="Title" className={styles.input} />
                <input type="text" placeholder="Description" className={styles.input} />
                <input type="submit" value="Create" className={styles.button} />
            </form>
        </div>
    )
}

export default Create;
