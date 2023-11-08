import React from 'react';
import { useEstacion } from '../context/EstacionContext';
import { Link } from 'react-router-dom';
import days from 'dayjs'
import utc from 'dayjs/plugin/utc'


days.extend(utc)
function EstacionesCard ({estacion, setOpen}) {
    const {deleteEstacion, setEstacion} =useEstacion();
    
    return (
        
        <div className='bg-zinc-800 max-w-xl w-full p-10 rounded-md'>
           
            <header className='flex justify-center my-3'>
                <h1 className='text-xl font-bold'>{estacion.nombre.toUpperCase()}</h1>
               

            </header>
            <div className='flex gap-x-2 items-center'>
                    <button 
                    className='bg-red-500 py-1 px-3 rounded-md m-0.5'
                    onClick={() =>{
                        deleteEstacion(estacion._id)
                    }}>Borrar</button>
                    <Link
                    to={`/estaciones/${estacion._id}`}
                    className='bg-blue-500 py-1 px-4 rounded-md m-0.5'
                    onClick={() =>{
                        console.log(estacion._id);
                    }}
                    >Editar</Link>
                    <button
                    className='bg-yellow-300 py-1 px-4 rounded-md m-0.5'
                    onClick={() =>{
                        console.log(estacion._id);
                        setEstacion(estacion);
                        setOpen(true);
                    }}
                    >Cargar</button>
            </div>
            <p className='text-slate-200'> <samp className='font-bold'>Latitud : </samp>{
                estacion.latitud
            }</p>
            <p className='text-slate-200'><samp className='font-bold'>Longitud: </samp>{
                estacion.longitud
            }</p>
            <p className='text-slate-200'><samp className='font-bold'>Creada: </samp>{
                days(estacion.createdAt).utc().format("DD/MM/YYYY HH:mm:ss")
                
            }</p>
            <p className='text-slate-200'><samp className='font-bold'>Actualizada: </samp>{
                days(estacion.updatedAt).utc().format("DD/MM/YYYY HH:mm:ss")
            }</p>
            <p className='text-slate-400 m-2 '>{
                estacion._id
            }</p>
        </div>
    );
};

export default EstacionesCard;