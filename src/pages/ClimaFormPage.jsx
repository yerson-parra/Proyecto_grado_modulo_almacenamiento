import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import { useClima } from '../context/ClimaContext';
import { useEstacion } from '../context/EstacionContext';
import { Link } from 'react-router-dom';
import DropEstaciones from '../components/DropEstaciones';

const ClimaFormPage = () => {
    const {register, handleSubmit, formState: {
        errors
    }, setValue} = useForm();

    const navigate = useNavigate();
    const params = useParams();
    const {getClima,updateClima}= useClima();
    const {getEstaciones, estaciones}= useEstacion();
    useEffect(() => {
        async function loadClima(){
            if(params.id){
                const clima = await getClima(params.id)

           
                setValue('humedad', clima.humedad.valor)
                setValue('valor_humedad', clima.humedad.unidad)
                setValue('precipitacion', clima.precipitacion.valor)
                setValue('valor_precipitacion', clima.precipitacion.unidad)
                setValue('presion_atmosferica', clima.presion_atmosferica.valor)
                setValue('valor_presion_atmosferica', clima.presion_atmosferica.unidad)
                setValue('temperatura', clima.temperatura.valor)
                setValue('valor_temperatura', clima.temperatura.unidad)
                setValue('direccion', clima.viento.direccion)
                setValue('unidad_viento', clima.viento.velocidad.unidad)
                setValue('velocidad', clima.viento.velocidad.valor)
                if(clima.estacion){
                  setValue('estacion', clima.estacion.nombre)
                }
                
               //
            }
            
        }
        loadClima()
        getEstaciones()
    }, [])

    const onSubmit = handleSubmit(async(data) => {
        if(params.id){
            
            const estacionFount = estaciones.filter(estacion => estacion.nombre === data.estacion)
            
            const clima = {
              "estacion" : estacionFount[0]._id,
              "humedad" : {
                "valor" : data.humedad,
                "unidad": data.valor_humedad
              }, 
              "precipitacion":{
                "valor" : data.precipitacion,
                "unidad" : data.valor_precipitacion
              },
              "presion_atmosferica":{
                "valor" : data.presion_atmosferica,
                "unidad" : data.valor_presion_atmosferica
              },
              "temperatura":{
                "valor" : data.temperatura,
                "unidad": data.valor_temperatura
              },
              "viento":{
                "velocidad" : {
                  "valor" : data.velocidad,
                  "unidad" : data.unidad_viento
                },
                "direccion" : data.direccion
              }
            }

           
            await updateClima(params.id,clima)
        }
        navigate('/')
    })
    return (
        <form onSubmit={onSubmit}>
          <div className="flex items-center justify-center">
            
    
            <div className=" max-w-md">
            
    
              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
                <div className="sm:col-span-3 ">
                  <label htmlFor="humedad" className="block text-sm font-medium leading-6 text-white">
                    Humedad
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      {...register("humedad", {required : true})}
                      id="humedad"
                      className="block max-w-sm rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div className="sm:col-span-3">
                  <label htmlFor="valor_humedad" className="block text-sm font-medium leading-6 text-white">
                    Unidad
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("valor_humedad", {required: true})}
                      id="valor_humedad"
                      className="block max-w-sm rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3 ">
                  <label htmlFor="precipitacion" className="block text-sm font-medium leading-6 text-white">
                    Precipitacion
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("precipitacion", {required : true})}
                      id="precipitacion"
                      className="block max-w-sm rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div className="sm:col-span-3">
                  <label htmlFor="valor_precipitacion" className="block text-sm font-medium leading-6 text-white">
                    Unidad
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("valor_precipitacion", {required: true})}
                      id="valor_precipitacion"
                      className="block max-w-sm rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3 ">
                  <label htmlFor="presion_atmosferica" className="block text-sm font-medium leading-6 text-white">
                    Presion Atmosferica
                  </label>
                  <div className="mt-2">
                    <input
                      type="double"
                      {...register("presion_atmosferica", {required : true})}
                      id="presion_atmosferica"
                      className="block max-w-sm rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div className="sm:col-span-3">
                  <label htmlFor="valor_presion_atmosferica" className="block text-sm font-medium leading-6 text-white">
                    Unidad
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("valor_presion_atmosferica", {required: true})}
                      id="valor_presion_atmosferica"
                      className="block max-w-sm rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3 ">
                  <label htmlFor="temperatura" className="block text-sm font-medium leading-6 text-white">
                  temperatura
                  </label>
                  <div className="mt-2">
                    <input
                      type="double"
                      {...register("temperatura", {required : true})}
                      id="temperatura"
                      className="block max-w-sm rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div className="sm:col-span-3">
                  <label htmlFor="valor_temperatura" className="block text-sm font-medium leading-6 text-white">
                    Unidad
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("valor_temperatura", {required: true})}
                      id="valor_temperatura"
                      autoComplete="family-name"
                      className="block max-w-sm rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div className="sm:col-span-3">
                  <label htmlFor="estacion" className="block text-sm font-medium leading-6 text-white">
                    Estacion
                  </label>
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
                </div>
    
                
    
                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-white">
                  direccion
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("direccion", {required: true})}
                      id="direccion"
                      
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div className="sm:col-span-2">
                  <label htmlFor="velocidad" className="block text-sm font-medium leading-6 text-white">
                    Velocidad
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      {...register("velocidad", {required: true})}
                      id="velocidad"
                      
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div className="sm:col-span-2">
                  <label htmlFor="unidad_viento" className="block text-sm font-medium leading-6 text-white">
                    Unidad
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("unidad_viento", {required: true})}
                      id="unidad_viento"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
    
          </div>
    
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link 
            to={"/"}
            type="button" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
              Cancelar
            </Link>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Guardar
            </button>
          </div>
        </form>
      )
};

export default ClimaFormPage;