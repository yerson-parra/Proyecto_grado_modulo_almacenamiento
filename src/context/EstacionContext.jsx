import { createContext, useState, useContext } from "react";
import { createEstacionRequest, getEstacionRequest, getEstacionesRequest, deleteEstacionRequest, updateEstacionRequest } from "../api/estacion";
const EstacionContext = createContext();

export const useEstacion = () => {
    const context = useContext(EstacionContext);

    if (!context){
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
}

export function EstacionProvider({children}){
    const [estaciones ,  setEstaciones] = useState([])
    const [estacion, setEstacion] = useState(null)

    const getEstaciones = async() => {
        try{
            const res = await getEstacionesRequest();
            setEstaciones(res.data)
           
        }catch (e){
            console.error(e)
        }
    }

    const getEstacion = async(id) => {
        try{
            const res = await getEstacionRequest(id);
           return res.data;
        }catch (e){
            console.error(e)
        }
    }
    const createEstacion = async(estacion) => {
        const res = await createEstacionRequest(estacion);
        console.log(res)
    }
    const deleteEstacion = async(id) => {
        try {
            const res = await deleteEstacionRequest(id);
            if (res.status === 204) setEstaciones(estaciones.filter(estacion => estacion._id != id))
         
        } catch (error) {
            console.error(error)
        }
    }
    const updateEstacion = async(id, estacion) => {
        try {
            const res = await updateEstacionRequest(id, estacion);
            
         
        } catch (error) {
            console.error(error)
        }
    } 
    return(
        <EstacionContext.Provider value={{
            estaciones,
            createEstacion,
            getEstaciones, 
            deleteEstacion, 
            getEstacion, 
            updateEstacion,
            estacion,
            setEstacion
        }}>
            {
                children
            }
        </EstacionContext.Provider>
    )
    
}