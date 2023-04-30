import React from 'react'
import styles from "../styles/Create.module.css"
import { useRouter } from 'next/router'

const NoAuth = () => {
    const router = useRouter();
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <h1 style={{ marginTop: "150px" }}> To see all tasks please Login </h1>
            <input type="submit" value="Go To Login" className={styles.button} onClick={() => { router.push({ pathname: "/account" }) }} />
        </div>
    )
}

export { NoAuth }
