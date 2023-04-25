import styles from "../styles/Account.module.css";
import { useEffect } from 'react'

const Account = () => {

    useEffect(() => {
        document.title = "Account";
    }, [])

    return (
        <div className={styles.account}>

            <h1> Good to see you! </h1>

            <form className={styles.form}>
                <h1> Login </h1>
                <input type="text" placeholder="Email" className={styles.input} />
                <input type="text" placeholder="Password" className={styles.input} />
                <input type="submit" value="Login" className={styles.button} />
            </form>

        </div>
    )
}

export default Account;
