import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Navbar.module.css'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { FaUser } from 'react-icons/fa'
import { LOGIN } from '@/redux/auth/types'

const Navbar = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const AuthState = useSelector((store) => {
        return store;
    })

    const navlist = [
        { name: "All Tasks", path: "/" },
        { name: "Create", path: "/create" }
    ]

    const token_login_handler = async () => {
        try {
            let response = await fetch('/api/auth/token', {
                method: "POST",
                headers: { authorization: `Bearer ${localStorage.getItem('nexttodo_token')}` }
            })

            let json = await response.json();

            dispatch({ type: LOGIN, payload: json.success })

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('nexttodo_token')) {
            token_login_handler()
        }
    }, [])

    return (
        <div className={`${styles.navbar}`}>

            <div className={styles.logo}>

                <Link href="/">
                    <Image
                        src="/logo.png"
                        width={50}
                        height={50}
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

                {AuthState.name ?
                    <>
                        <FaUser />
                        &nbsp;
                        <Link href="/account"> {AuthState.name} </Link>
                    </>
                    :

                    <>
                        <Link href="/account"> <button> Login or Signup </button> </Link>
                    </>

                }

            </div>


        </div>
    )
}

export default Navbar;
