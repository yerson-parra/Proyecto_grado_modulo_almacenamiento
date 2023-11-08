import axios from './axios'

export const getEstacionesRequest = ( ) => axios.get('/estaciones')
export const getEstacionRequest = (id) => axios.get(`/estaciones/${id}`)
export const createEstacionRequest = (estacion) => axios.post('/estaciones', estacion)
export const updateEstacionRequest = (id,estacion) => axios.put(`/estaciones/${id}`, estacion);
export const deleteEstacionRequest = (id) => axios.delete(`/estaciones/${id}`)