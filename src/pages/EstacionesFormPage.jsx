import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form'
import MapPicker from '../components/MapPicker';
import { useEstacion } from '../context/EstacionContext';
import { useNavigate, useParams } from 'react-router-dom';
const EstacionesFormPage = () => {
    const [selectedLocation, setSelectedLocation] = useState({lat:null, lng:null});
    const [enviar , setEnviar] = useState(true)
    const {register, handleSubmit, formState: {
        errors
    }, setValue} = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const {createEstacion, getEstacion, updateEstacion}= useEstacion();

    useEffect(() => {
        async function loadEstacion(){
            if(params.id){
                const estacion = await getEstacion(params.id)
                setValue('nombre', estacion.nombre)
                setSelectedLocation({lat:estacion.latitud, lng:estacion.longitud})
            }
        }
        loadEstacion()
    }, [])

    const onSubmit = handleSubmit(async(data) => {
        if(params.id){
            const estacion = ({
                nombre: data.nombre,
                latitud: selectedLocation.lat,
                longitud: selectedLocation.lng
            });
            await updateEstacion(params.id,estacion)
        }else{
            if (selectedLocation.lat===null || selectedLocation.lng === null)  return setEnviar(false)
        
            const estacion = ({
                nombre: data.nombre,
                latitud: selectedLocation.lat,
                longitud: selectedLocation.lng
            });
            await createEstacion(estacion)
            
        }
        navigate('/estaciones')
    })
    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-3xl w-full p-10 rounded-md'>
            
                <h1 className='text-2xl font-bold'>Estaciones</h1>

                <form onSubmit={onSubmit}>
        
                    <input type="text" {...register("nombre", {required: true})} 
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='nombre de la estacion'
                    />
                    {
                        errors.nombre &&( <p className='text-red-500'>nombre is required</p>)
                    }
                    {
                        enviar ? (<></>) : (<h1 className='text-red-500'>Seleccionar una ubicación es requerido</h1>)
                    }
                    <MapPicker selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} setEnviar={setEnviar}/>
                    
                    <div className="authButtons basis-1/4  flex flex-col items-center justify-center">
                        <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2 " >Guardar</button>
                    </div>
                </form>
                
            </div>
        </div>
        
    );
};

export default EstacionesFormPage;