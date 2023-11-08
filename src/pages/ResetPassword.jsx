import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext'
import { useNavigate,  useSearchParams } from 'react-router-dom';

const ResetPassword = () => {

    const {register, handleSubmit, formState: {
        errors
    }} = useForm();
    const [searchParams] = useSearchParams();
    
    const navigate = useNavigate();
    const {resetpassword, confirm, errors:signinErrors, setErrors}= useAuth();
   

   
    const onSubmit = handleSubmit(async(data) => {

        const token = searchParams.get('token');
        if(token){
            if(data.password === data.cofirmpassword){

                const newuser={
                    token : token,
                    newPassword: data.password
                }
                console.log(newuser)
                await resetpassword(newuser)
            }else{
                setErrors(["Las contraseñas no coinciden"])
            }
           
        }
        
    })
    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-3xl w-full p-10 rounded-md'>
            {
                signinErrors.map((error, i) => (
                    <div className = "bg-red-500 p-2 text-white text-center m-2" key={i}>
                        {error}
                    </div>
                ))
            }
            {
                confirm.map((con, j) => (
                    <div className = "bg-green-500 p-2 text-white text-center m-2" key={j}>
                        {con}
                    </div>
                ))
            }
                <h1 className='text-2xl font-bold'>Recuperar Contraseña</h1>

                <form onSubmit={onSubmit}>
        
                    <input type="text" {...register("password", {required: true})} 
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Contraseña nueva'
                    />
                    {
                        errors.password &&( <p className='text-red-500'>password is required</p>)
                    }
                    <input type="text" {...register("cofirmpassword", {required: true})} 
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Confirmar la contraseña'
                    />
                    {
                        errors.cofirmpassword &&( <p className='text-red-500'>password is required</p>)
                    }
                    
                    <div className="authButtons basis-1/4  flex flex-col items-center justify-center">
                        <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2 " >Guardar</button>
                    </div>
                </form>
                
            </div>
        </div>
        
    );
};

export default ResetPassword;