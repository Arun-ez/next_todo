import React from 'react'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import { useRouter } from 'next/router'

const Navbar = () => {

    const router = useRouter();

    const navlist = [
        { name: "All Tasks", path: "/" },
        { name: "Create", path: "/create" }
    ]

    return (
        <div className={`${styles.navbar}`}>

            <div className={styles.logo}>

                <Link href="/">
                    <img
                        src="https://cdn1.iconfinder.com/data/icons/line-awesome-vol-4/32/infinity-solid-256.png"
                        width="50px"
                        height="50px"
                        alt="logo"
                    />
                </Link>

                <Link href="/">
                    <h2> NextTodo </h2>
                </Link>

            </div>

            <div className={styles.navlist}>
                {
                    navlist.map(({ name, path }, id) => {
                        return (
                            <Link
                                className={`${styles.link} ${router.pathname === path ? styles.active : styles.inactive}`}
                                href={path}
                                key={id}>
                                {name}
                            </Link>
                        )
                    })
                }
            </div>

            <div className={styles.account}>
                <button> <Link href="/account"> Login or Signup </Link> </button>
            </div>


        </div>
    )
}

export default Navbar;
