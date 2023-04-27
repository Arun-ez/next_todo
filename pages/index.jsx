import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

const Home = ({ data }) => {

  let [tasks, setTasks] = useState(data);

  return (
    <>
      <main className={styles.home}>
        <h1> Welcome to NextTodo </h1>
        <p> See all your tasks  </p>

        <div className={styles.container}>
          {tasks.map(({ title, description, status }, id) => {
            return (
              <div key={id}>
                <h2> {title} </h2>
                <p> {description} </p>
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}

const getServerSideProps = async (context) => {

  let data = [
    { title: "React", description: "Revise useState, useEffect, learn useMemo", status: false }
  ]

  return {
    props: { data } // will be passed to the page component as props
  }
}

export { getServerSideProps }
export default Home;