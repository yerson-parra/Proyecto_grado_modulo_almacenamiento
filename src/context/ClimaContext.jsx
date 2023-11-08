import { createContext, useState, useContext } from "react";
import { createClimaRequest, getClimasRequest, getClimaRequest, deleteClimaRequest, updateClimaRequest } from "../api/clima";

const ClimaContext = createContext();

export const useClima = () => {
    const context = useContext(ClimaContext);

    if (!context){
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
}

export function ClimaProvider({children}){
    const [climas ,  setClimas] = useState([])
    const [climasFiler ,  setClimasFiler] = useState([])
    const [clima, setClima] = useState(null)

    const getClimas = async() => {
        try{
            const res = await getClimasRequest();
            setClimas(res.data)
            setClimasFiler(res.data)
           
        }catch (e){
            console.error(e)
        }
    }

    const getClima = async(id) => {
        try{
            const res = await getClimaRequest(id);
            return res.data;
        }catch (e){
            console.error(e)
        }
    }
    const createClima = async(clima) => {
        try {
            const res = await createClimaRequest(clima);
            return res;
        } catch (error) {
            throw error;
        }
        
    }
    const deleteClima = async(id) => {
        try {
            const res = await deleteClimaRequest(id);
            if (res.status === 204) setClimas(climas.filter(climaf => climaf._id != id))
         
        } catch (error) {
            console.error(error)
        }
    }
    const updateClima = async(id, clima) => {
        try {
            const res = await updateClimaRequest(id, clima);
         
        } catch (error) {
            console.error(error)
        }
    } 
    return(
        <ClimaContext.Provider value={{
            climas,
            createClima,
            getClimas, 
            deleteClima, 
            getClima, 
            updateClima,
            clima,
            setClima, 
            climasFiler,
            setClimasFiler 
        }}>
            {
                children
            }
        </ClimaContext.Provider>
    )
    
}