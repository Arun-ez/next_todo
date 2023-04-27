import React, { useState } from 'react'
import styles from '../styles/Account.module.css'
import { useRouter } from 'next/router'

const Register = () => {

    const router = useRouter();

    const [name_error, set_name_error] = useState("");
    const [email_error, set_email_error] = useState("");
    const [password_error, set_password_error] = useState("");
    const [confirm_password_error, set_confirm_password_error] = useState("");
    let [toast_message, set_toast_message] = useState("");
    let [toast_display, set_toast_display] = useState(styles.remove_toast);


    const post_userdata = async (data) => {
        try {
            let response = await fetch('/api/auth/register', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            let json = await response.json();

            if (json.hasOwnProperty('failed')) {
                set_toast_message(json.failed);
            } else {
                set_toast_message(json.success);
                set_toast_display(styles.slideTop);
                setTimeout(() => {
                    set_toast_message("");
                    set_toast_display(styles.remove_toast);
                    router.push({ pathname: "/account" })
                }, 2000)

                return;
            }

        } catch (error) {
            set_toast_message(error.message);
        }

        set_toast_display(styles.slideTop);
        setTimeout(() => {
            set_toast_message("");
            set_toast_display(styles.remove_toast);
        }, 2000)
    }

    const register = (event) => {
        event.preventDefault();
        const { name, email, password, confirm_password } = event.target;
        const data = { name: name.value, email: email.value, password: password.value }

        let valid = true;

        if (data.name.length < 8) {
            set_name_error("Name must be 8 characters long");
            name.style.border = "1px solid #e8603a";
            valid = false;
        } else {
            set_name_error("");
            name.style.border = "1px solid #f2f2f2";
        }

        if (!data.email.includes('@')) {
            set_email_error("Invalid Email")
            email.style.border = "1px solid #e8603a";
            valid = false;
        } else {
            set_email_error("")
            email.style.border = "1px solid #f2f2f2";
        }

        if (data.password.length < 8) {
            set_password_error("Password must be 8 characters long");
            password.style.border = "1px solid #e8603a";
            valid = false;
        } else {
            set_password_error("");
            password.style.border = "1px solid #f2f2f2";
        }

        if (data.password !== confirm_password.value) {
            set_confirm_password_error("Passwords doesn't match")
            confirm_password.style.border = "1px solid #e8603a";
            valid = false;
        } else {
            set_confirm_password_error("")
            confirm_password.style.border = "1px solid #f2f2f2";
        }

        if (!valid) {
            return;
        }

        post_userdata(data);
    }

    return (
        <div className={styles.account}>

            <div className={toast_display}> {toast_message} </div>

            <h1> Hi User, Start your journey </h1>

            <form className={styles.form} onSubmit={register}>
                <h1> Signup </h1>
                <input type="text" name="name" placeholder="Full Name" className={styles.input} />
                <small> {name_error} </small>
                <input name="email" type="text" placeholder="Email" className={styles.input} />
                <small> {email_error} </small>
                <input name="password" type="password" placeholder="Password" className={styles.input} />
                <small> {password_error} </small>
                <input name="confirm_password" type="password" placeholder="Confirm Password" className={styles.input} />
                <small> {confirm_password_error} </small>
                <input type="submit" value="Signup" className={styles.button} />
            </form>

        </div>
    )
}

export default Register;
