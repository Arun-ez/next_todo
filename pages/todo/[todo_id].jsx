import React from 'react'
import { useRouter } from 'next/router'

const TodoView = () => {

    const router = useRouter();
    const { todo_id } = router.query;

    return (
        <div>
            <h1> {todo_id} </h1>
        </div>
    )
}

export default TodoView
