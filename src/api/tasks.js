import axios from './axios'

export const getTasksRequest = ( ) => axios.get('/tasks')
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`)
export const createTasksRequest = (tasks) => axios.post('/tasks', tasks)
export const updateTasksRequest = (tasks) => axios.put(`/tasks/${tasks._id}`, tasks);
export const deleteTasksRequest = (id) => axios.delete(`/tasks/${id}`)