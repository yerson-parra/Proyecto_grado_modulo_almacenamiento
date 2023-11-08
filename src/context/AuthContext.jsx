import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, verifyTokenRequest,  registerRequest, resetpasswordRequest, sendemailRequest} from '../api/auth.js';
import Cookies from 'js-cookie'

export const AuthContext = createContext()
export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (! context){
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])
    const [confirm, setConfirm] = useState([])
    useEffect (() => {
        
        if (confirm.length > 0) {
            const timer = setTimeout(() => {
                setConfirm([])
            },5000)

            return () => clearTimeout(timer)
        }

    }, [confirm])
    useEffect (() => {
        
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            },5000)

            return () => clearTimeout(timer)
        }

    }, [errors])
    useEffect(()=> {
        async function checkLogin(){
            const cookies = Cookies.get()
    
            if (!cookies.token){
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                return ;
            }
                try {
                    const res = await verifyTokenRequest(cookies.token)
                    if (!res.data){
                        setIsAuthenticated(false)
                        setLoading(false);
                        return;
                    } 
                    setIsAuthenticated(true)
                    setUser(res.data)
                    setLoading(false);
                } catch (error) {
                    setIsAuthenticated(false)
                    setUser(null)
                    setLoading(false);
                }
            
        }
        checkLogin();
    }, [])

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    const signin = async (user) =>{
        try {
             const res = await loginRequest(user)
             setUser(res.data)
             setIsAuthenticated(true)
        } catch (error) {
             
             setErrors(error.response.data)
        }
     }
     const register = async (user) =>{
        try {
            const res = await registerRequest(user)
            if (res.status === 200) setConfirm(['Registrado con exito'])
       
        } catch (error) {
             
             setErrors(error.response.data)
        }
     }
     const resetpassword = async (user) =>{
        try {
             const res = await resetpasswordRequest(user)
             if (res.status === 200) setConfirm(['Contraseña restablecida con exito'])
        } catch (error) {
             
             setErrors(error.response.data)
        }
     }

     const sendEmail = async (email) =>{
        try {
             const res = await sendemailRequest(email)
             if (res.status === 200) setConfirm(['Correo enviado con exito'])
        } catch (error) {
             
             setErrors(error.response.data)
        }
     }
    return(
        <AuthContext.Provider value={{
            signin,
            logout,
            register,
            user,
            isAuthenticated,
            errors,
            confirm,
            loading,
            setErrors,
            resetpassword, 
            sendEmail
        }}>
            {children}
        </AuthContext.Provider>
    )
}
