import axios from "./axios";  


export const loginRequest = user => axios.post(`/login`, user)
export const registerRequest = user => axios.post(`/register`, user)
export const verifyTokenRequest = () => axios.get(`/auth/verify`)
export const resetpasswordRequest = user => axios.post(`/reset`, user)
export const sendemailRequest = user => axios.post(`/sendemail`, user)