import React, {useEffect, useState} from 'react';
import { useEstacion } from '../context/EstacionContext';
import EstacionesCard from '../components/EstacionesCard';
import Modal from '../components/Modal';
const EstacionesPage = () => {
    const {estaciones, getEstaciones, estacion}= useEstacion();
    const [open, setOpen] = useState(false)
    useEffect(() => {
        getEstaciones();
    },[])
    if (estaciones.length === 0) return (<h1>No existen estaciones</h1>)
    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  s gap-2'>
            {
                estacion ? (<Modal open={open} setOpen={setOpen}/>) : (<></>)
            }
            {
                estaciones.map(estacion =>(
                    <EstacionesCard estacion={estacion} setOpen={setOpen} key={estacion._id} />
                ))
            }
            
        </div>
    );
};

export default EstacionesPage;