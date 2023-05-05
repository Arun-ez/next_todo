import { useEffect, useState } from 'react'
import styles from "../styles/Loading.module.css"
import { useRouter } from 'next/router';
import Image from 'next/image';

const Loading = (dependency) => {

    const router = useRouter();
    const [waiting_state, set_waiting_state] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            if (!dependency.length) {
                set_waiting_state(false);
            }
        }, 3000)
    }, [])

    return (

        <>

            {waiting_state ?
                <>
                    <div className={`${styles.spinner}`}>
                        <div className={`${styles.bar} ${styles.bar1}`}></div>
                        <div className={`${styles.bar} ${styles.bar2}`}></div>
                        <div className={`${styles.bar} ${styles.bar3}`}></div>
                        <div className={`${styles.bar} ${styles.bar4}`}></div>
                        <div className={`${styles.bar} ${styles.bar5}`}></div>
                        <div className={`${styles.bar} ${styles.bar6}`}></div>
                        <div className={`${styles.bar} ${styles.bar7}`}></div>
                        <div className={`${styles.bar} ${styles.bar8}`}></div>
                    </div>
                </>

                :

                <>
                    <Image className={styles.image} src="/not_found.svg" width={500} height={170} />
                    <h1 className={styles.h1}> No tasks found </h1>
                    <input type="button" className={styles.button} onClick={() => { router.push({ pathname: "/create" }) }} value="Create One" />
                </>
            }


        </>
    )
}

export { Loading }
