import React, { useEffect, useState } from 'react';
import { useClima } from '../context/ClimaContext'
import { Link } from 'react-router-dom';
import days from 'dayjs'
import utc from 'dayjs/plugin/utc'
import moment from 'moment'
import DatePicker from 'react-datepicker';
import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';
import { useEstacion } from '../context/EstacionContext';
import  ReactHTMLTableToExcel  from 'react-html-table-to-excel';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



days.extend(utc)



const ClimaList = () => {
    const {climas, getClimas, setClimasFiler, climasFiler, deleteClima}= useClima();
    const [date, setDate] = useState(null);
    const [dateF, setDateF] = useState(null);
    const {isAuthenticated} = useAuth()
    const {getEstaciones, estaciones}= useEstacion();
    const {handleSubmit, register} = useForm();
    const [error, setError] = useState(null);

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({ html: '#tabla-clima' });
        doc.save('clima.pdf');
    };
    const onSubmit = handleSubmit ((data) => {
        
        setClimasFiler(climas)
        let climasFilterList = []
  
        const dateSelected = moment(date, "DD/MM/YYYY hh:mm:ss a")
        const dateSelectedF = moment(dateF, "DD/MM/YYYY hh:mm:ss a")
        
       

        if (!dateSelected._isValid && !dateSelectedF._isValid && data.estacion != "Seleccione" ){
            climasFilterList=climas.filter(clima => clima.estacion.nombre.toUpperCase() === data.estacion.toUpperCase())
            setClimasFiler(climasFilterList)  
        }else if (dateSelected._isValid && dateSelectedF._isValid ){
            climas.map(clima => {
                let date = days(clima.fecha_hora).utc().format("DD/MM/YYYY hh:mm:ss a")
                date = moment(date, "DD/MM/YYYY HH:mm:ss a");
            
                if (date.isSame(dateSelected) || date.isAfter(dateSelected) &&  date.isBefore(dateSelectedF) || date.isSame(dateSelectedF)){
                    if(data.estacion === "Seleccione"){
                        climasFilterList.push(clima)
                    }else if(clima.estacion.nombre.toUpperCase() === data.estacion.toUpperCase()){
                        climasFilterList.push(clima)
                    }
                        
                }
            })
            setClimasFiler(climasFilterList)
        }else{
            setError('¡Los datos ingresadas no son válidos!');
            setClimasFiler(climas)
            return;
        }
        
        
    });

    
    useEffect(() =>{
        getClimas()
        getEstaciones()
    }, [])

    useEffect(() =>{
        setClimasFiler(climas)
       
    }, [climas])

    useEffect (() => {
        
        if (error != null) {
            const timer = setTimeout(() => {
                setError(null)
            },3000)
    
            return () => clearTimeout(timer)
        }
    
    }, [error])
    
    return (
        <div>

            <form className="bg-white p-3 my-1 rounded-lg text-black " onSubmit={onSubmit}>
                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  s gap-2'>
                    <div className='w-full max-w-full flex flex-col items-center justify-center'>
                        Fecha de inicio
                        <DateTimePicker calendarClassName='bg-gray-500' clockClassName='bg-gray-500'selected={date}
                        value={date}
                        onChange={setDate}
                        format="dd/MM/yyyy hh:mm:ss a"/>
                    </div>

                    <div className='w-full max-w-full flex flex-col items-center justify-center'>
                        Fecha fin
                        <DateTimePicker  calendarClassName='bg-gray-500' clockClassName='bg-gray-500'selected={dateF}
                        value={dateF}
                        onChange={setDateF}
                        format="dd/MM/yyyy hh:mm:ss a"/>
                    </div>
                    <div className='w-full max-w-full flex flex-col items-center justify-center'>
                        <div className="mt-5">
                            <select
                                    id="estacion"
                                    name="estacion"
                                    {...register("estacion", {required: true, key: "sd"})}
                                    className="w-full max-w-full rounded-md border-0 p-1.5 text-gray-900  ring-1 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                                >
                                <option value="Seleccione">Seleccione</option>
                                {
                                estaciones.map(estacion => (
                                <option key={estacion._id}>{estacion.nombre}</option>
                                ))
                                }
                                    
                            </select>
                        </div>
                    </div>
                </div>
                
                <div  className='w-full max-w-full flex flex-col items-center justify-center'>
                    <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2 " >Buscar</button>
                </div>
                <div>
                    {error && <div className='text-red-600 font-semibold '>{error}</div>}
                </div>
            </form>
            
            <div className='w-full max-w-full flex flex-col items-center justify-center m-6'>
                <div className='flex gap-x-2 items-center'>
                <ReactHTMLTableToExcel 
                    id="botonExportarExcel"
                    className ='rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
                    table="tabla-clima"
                    filename="clima"
                    sheet="clima"
                    buttonText="Exportar Excel"
                />
                <button className='rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
                                                     onClick={exportToPDF}>Exportar a PDF</button>
                </div>
                
            </div>
            <div className='overflow-x-auto w-full'>
            <table className='max-w-full w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden' id="tabla-clima">
                <thead className="bg-gray-500">
                    <tr className="text-white text-left">
                    <th className="font-semibold text-sm uppercase px-1 py-4 text-center"> FECHA Y HORA </th>
                        <th className="font-semibold text-sm uppercase px-1 py-4 text-center"> TEMPERATURA </th>
                        <th className="font-semibold text-sm uppercase px-1 py-4 text-center"> HUMEDAD </th>
                        <th className="font-semibold text-sm uppercase px-1 py-4 text-center"> PRESION ATMOSFERICA </th>
                        <th className="font-semibold text-sm uppercase px-1 py-4 text-center"> VIENTO </th>
                        <th className="font-semibold text-sm uppercase px-1 py-4 text-center"> PRECIPITACION </th>
                        <th className="font-semibold text-sm uppercase px-1 py-4 text-center"> ESTACION </th>
                        {
                            isAuthenticated ? (<th>  </th>):(<></>)
                        }
                    </tr>
                    
                </thead>
                <tbody className="divide-y divide-gray-200 text-black">
                    {
                        
                        climasFiler.map(clima => (
                            <tr key={clima._id}>
                                <td>
                                    <div className="font-semibold text-sm uppercase px-1 py-4 text-center">
                                       
                                        {
                                            days(clima.fecha_hora).utc().format("DD/MM/YYYY HH:mm:ss")
                                        }
                                    </div>
                                </td>
                                <td>
                                    <div className="font-semibold text-sm uppercase px-1 py-4 text-center">
                                        
                                        {
                                            clima.temperatura.valor 
                                        }

                                        {
                                        "°     " + clima.temperatura.unidad
                                        } 
                                        
                                    </div>
                                </td>
                                <td>
                                    <div className="font-semibold    px-1 py-4 text-center">
                                        
                                        {
                                            clima.humedad.valor 
                                        }
                                        {
                                        clima.humedad.unidad === 'porcentaje'?(<>{clima.humedad.unidad}</>):(<>%</>)
                                        } 
                                        
                                    </div>
                                </td>
                                <td>
                                    <div className="font-semibold    px-1 py-4 text-center">
                                        
                                        {
                                            clima.presion_atmosferica.valor 
                                        }
                                        {
                                            "  " + clima.presion_atmosferica.unidad
                                        } 
                                       
                                    </div>
                                </td>
                                <td >
                                    <div className="font-semibold     text-center">
                                        <div>
                                        {
                                            clima.viento.velocidad.valor 
                                        }
                                        {
                                            "  " + clima.viento.velocidad.unidad
                                        } 
                                        </div>
                                        <div>
                                        {
                                            clima.viento.direccion 
                                        }
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-semibold    px-1 py-4 text-center">
                                        
                                        {
                                            clima.precipitacion.valor 
                                        }
                                        {
                                            "  " + clima.precipitacion.unidad
                                        } 
                                       
                                    </div>
                                </td>
                                <td >
                                    <div className="font-semibold    px-1 py-4 text-center">
                                        {
                                            clima.estacion === null ? (<></>) : (<>{clima.estacion.nombre}</>)
                                        }    
                                    </div>
                                </td>
                                
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default ClimaList;