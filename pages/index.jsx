import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { TodoItem } from '@/components/TodoItem';
import { useRouter } from 'next/router';
import { NoAuth } from '@/components/NoAuth';
import { useSelector } from 'react-redux';

const Home = () => {

  const router = useRouter();
  let [tasks, setTasks] = useState([]);

  let token = useSelector((store) => {
    return store.token;
  })

  const load = async () => {
    try {
      let response = await fetch('/api/tasks', {
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem('nexttodo_token')}` }
      })

      let json = await response.json();
      setTasks(json.data)
    } catch (error) {
      console.log(error);
    }
  }

  const toggle_status = async ({ id, status }) => {
    try {
      let response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: !status }),
        headers: { authorization: `Bearer ${localStorage.getItem('nexttodo_token')}` }
      })
      load();
    } catch (error) {
      console.log(error);
    }
  }

  const edit_todo = async (data, id) => {
    try {
      let response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: { authorization: `Bearer ${localStorage.getItem('nexttodo_token')}` }
      })
      load();
    } catch (error) {
      console.log(error);
    }
  }

  const remove_todo = async ({ id }) => {
    try {
      let response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${localStorage.getItem('nexttodo_token')}` }
      })
      load();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('nexttodo_token')) {
      load()
    }
  }, [])

  return (
    <>
      <main className={styles.home}>

        {token ?

          <>
            <h1> Welcome to NextTodo </h1>
            <p> See all your tasks  </p>

            <div className={styles.container}>
              {tasks.map((elm, id) => {
                return <TodoItem data={elm} toggle_status={toggle_status} edit_todo={edit_todo} remove_todo={remove_todo} key={id} />
              })}
            </div>
          </>

          :

          <>
            <NoAuth />
          </>

        }

      </main>
    </>
  )
}

export default Home;