import { createContext, useState, useContext, useEffect } from "react";
import { createTasksRequest, getTaskRequest, deleteTasksRequest, updateTasksRequest, getTasksRequest } from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context){
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
}

export function TaskProvider({children}){
    const [tasks ,  setTasks] = useState([])

    const getTasks = async() => {
        try{
            const res = await getTasksRequest();
            setTasks(res.data)
            console.log(res)
        }catch (e){
            console.error(e)
        }
    }

    const createTask = async(task) => {
        const res = await createTasksRequest(task);
        console.log(res)
    }
    return(
        <TaskContext.Provider value={{
            tasks,
            createTask,
            getTasks
        }}>
            {
                children
            }
        </TaskContext.Provider>
    )
    
}