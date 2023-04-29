import styles from "../styles/Account.module.css";
import { useEffect, useState } from 'react'
import Link from "next/link";
import { useSelector } from "react-redux";
import { LOGIN, LOGOUT } from "@/redux/auth/types";
import { useDispatch } from "react-redux";

const Account = () => {

    const dispatch = useDispatch();
    const [error, set_error] = useState("");
    let AuthState = useSelector((store) => {
        return store;
    })

    const post_userdata = async (data) => {
        try {
            let response = await fetch('/api/auth/login', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            let json = await response.json();

            if (json.hasOwnProperty('failed')) {
                set_error(json.failed);
                return;
            }

            set_error("");
            localStorage.setItem("nexttodo_token", json.token);
            dispatch({ type: LOGIN, payload: json });

        } catch (error) {
            console.log(error);
        }
    }

    const login = (event) => {
        event.preventDefault();
        const { email, password } = event.target;
        const data = { email: email.value, password: password.value }


        if ((!data.email || !data.email.includes('@')) && (!data.password)) {
            set_error("Invalid Email and password")
            return
        } else if (!data.email || !data.email.includes('@')) {
            set_error("Invalid Email")
            return
        } else if (!data.password) {
            set_error("password not provided");
            return
        }

        set_error("");
        post_userdata(data);
    }

    const logout = () => {
        localStorage.removeItem("nexttodo_token");
        dispatch({ type: LOGOUT });
    }

    useEffect(() => {
        document.title = "Account";
    }, [])

    return (
        <div className={styles.account}>

            {AuthState.name ?
                <>
                    <h2> {AuthState.name} </h2>
                    <p> {AuthState.email} </p>
                    <input type="submit" value="Logout" className={styles.button} onClick={logout} />
                </>

                :

                <>
                    <h1> Good to see you! </h1>

                    <form className={styles.form} onSubmit={login}>
                        <h1> Login </h1>
                        <input name="email" type="text" placeholder="Email" className={styles.input} />
                        <input name="password" type="text" placeholder="Password" className={styles.input} />
                        <small> {error} </small>
                        <input type="submit" value="Login" className={styles.button} />
                    </form>

                    <p> Don't have a account? <Link href="/register"> Create one </Link> </p>

                </>
            }



        </div>
    )
}

export default Account;
