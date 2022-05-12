import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import Button from "./components/Button";

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
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title);
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask();
        }
    }

    const onClickFilterHandler = (filerValue: FilterValuesType) => props.changeFilter(filerValue);

    const onClickHandler = (tID:string) => props.removeTask(tID)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
            />
            <Button name='+' callBack={addTask}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button name='x' callBack={()=> onClickHandler(t.id)}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button name="All" callBack={()=> onClickFilterHandler("all")}/>
            <Button name="Active" callBack={()=> onClickFilterHandler("active")}/>
            <Button name="Completed" callBack={()=> onClickFilterHandler("completed")}/>
        </div>
    </div>
}
