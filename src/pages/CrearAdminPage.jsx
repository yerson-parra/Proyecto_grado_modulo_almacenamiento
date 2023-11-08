import React from 'react';
import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CrearAdminPage = () => {
    const {register, handleSubmit, formState: {
        errors
    }} = useForm();
    const {register:registerUser, errors:signinErrors, setErrors, confirm} = useAuth();
  
    const onSubmit = handleSubmit (async (data) => {
        
       if (data.password != data.passwordConfirm){
            setErrors(["Las contraseñas no coinciden"])
       }else{
            const newUser= {
                email: data.email,
                password: data.password,
                username: data.username,
                roles: ['moderador']
            }

            await registerUser(newUser);

            
        }
        
        
    });

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
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
                <h1 className='text-2xl font-bold'>Registrar Admin</h1>

                <form onSubmit={onSubmit}>
                    <input type="text" {...register("username", {required: true})} 
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='username'
                    />
                    {
                        errors.username &&( <p className='text-red-500'>Username is required</p>)
                    }
                    <input type="email" {...register("email", {required: true})} 
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='email'
                    />
                    {
                        errors.email &&( <p className='text-red-500'>Email is required</p>)
                    }
                    <input type="password" {...register("password", {required : true})}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='password'
                    />  
                    {
                        errors.password &&( <p className='text-red-500'>Password is required</p>)
                    }
                    <input type="password" {...register("passwordConfirm", {required : true})}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='confirm password'
                    />  
                    {
                        errors.passwordConfirm &&( <p className='text-red-500'>Password is required</p>)
                    }
                    <div className="authButtons basis-1/4  flex flex-col items-center justify-center">
                        <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2 " >Registrar</button>
                    </div>
                    
                </form>
                
            </div>
        </div>
    );
};

export default CrearAdminPage;