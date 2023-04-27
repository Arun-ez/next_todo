import styles from "../styles/Account.module.css";
import { useEffect } from 'react'
import Link from "next/link";

const Account = () => {

    const login = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        document.title = "Account";
    }, [])

    return (
        <div className={styles.account}>

            <h1> Good to see you! </h1>

            <form className={styles.form} onSubmit={login}>
                <h1> Login </h1>
                <input name="email" type="text" placeholder="Email" className={styles.input} />
                <input name="password" type="text" placeholder="Password" className={styles.input} />
                <input type="submit" value="Login" className={styles.button} />
            </form>

            <p> Don't have a account? <Link href="/register"> Create one </Link> </p>

        </div>
    )
}

export default Account;
