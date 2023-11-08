import axios from './axios'

export const getClimasRequest = ( ) => axios.get('/clima')
export const getClimaRequest = (id) => axios.get(`/clima/${id}`)
export const createClimaRequest = (clima) => axios.post('/clima', clima)
export const updateClimaRequest = (id,clima) => axios.put(`/clima/${id}`, clima);
export const deleteClimaRequest = (id) => axios.delete(`/clima/${id}`)