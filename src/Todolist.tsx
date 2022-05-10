import React, {ChangeEvent, KeyboardEvent, ChangeEventHandler, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')

    const addTasksHandler = () => {
        props.addTasks(title)
        setTitle(' ')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTasksHandler()
        }
    }

    const changeFilterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }

    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
            <button onClick={addTasksHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => removeTaskHandler(t.id)}>x</button>
                        </li>
                    )
                })
            }
        </ul>
        <div>
            <button onClick={() => changeFilterHandler("all")}>All</button>
            <button onClick={() => changeFilterHandler("active")}>Active</button>
            <button onClick={() => changeFilterHandler("completed")}>Completed</button>
        </div>
    </div>
}
