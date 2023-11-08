import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form'
import { useEstacion } from '../context/EstacionContext';

const DropEstaciones = () => {

    useEffect(() => {
        getEstaciones()
    }, [])
    const {register} = useForm();
    const {getEstaciones, estaciones}= useEstacion();
    return (
        <div className="mt-2">
                <select
                    id="estacion"
                    name="estacion"
                    {...register("estacion", {required: true, key: "sd"})}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                {
                estaciones.map(estacion => (
                <option key={estacion._id}>{estacion.nombre}</option>
                ))
                }
                      
            </select>
        </div>
    );
};

export default DropEstaciones;