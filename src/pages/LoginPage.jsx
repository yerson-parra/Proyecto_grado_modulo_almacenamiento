import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const LoginPage = () => {
    const {register, handleSubmit, formState: {
        errors
    }} = useForm();
    const {signin, isAuthenticated, errors:signinErrors} = useAuth();
    const navigate = useNavigate()
    useEffect(() => {
        if(isAuthenticated) navigate("/estaciones")
    }, [isAuthenticated])
    const onSubmit = handleSubmit ((data) => {
        signin(data); 
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
                <h1 className='text-2xl font-bold'>Login</h1>

                <form onSubmit={onSubmit}>
        
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

                    <a href='/sendemail'>¿Olvido su contraseña?</a>
                    <div className="authButtons basis-1/4  flex flex-col items-center justify-center">
                        <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-2 " >Login</button>
                    </div>
                    
                </form>
                
            </div>
        </div>
    );
};

export default LoginPage;