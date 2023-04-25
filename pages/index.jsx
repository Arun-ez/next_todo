import styles from '../styles/Home.module.css'
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    document.title = "All Tasks"
  }, [])

  return (
    <>
      <main className={styles.home}>
        <h1> Welcome to NextTodo </h1>
        <p> See all your tasks  </p>
      </main>
    </>
  )
}

export default Home;