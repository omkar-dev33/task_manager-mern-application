import React from 'react'
import { useNavigate } from 'react-router-dom'
import SignUp from '../pages/SignUp'

const Login = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-col w-[350px] rounded-sm h-auto justify-center items-center">
                <div className="mb-4">
                    <label htmlFor="email" className="" id="email">Email : </label>
                    <input type="text" className="border-2 border-black" name="email" Placeholder="" />
                </div>

                <div className="">
                    <label htmlFor="" className="" id="password">Password : </label>
                    <input type="text" className="border-2 border-black" name="password" />
                </div>

                <button className="mt-3 rounded-lg border-2 px-2 py-1 text-black">Login</button>

                <div className="flex gap-2 mt-5">
                    <p className="text-black">Don't have an account ?</p>
                    <span className="hover:underline" onClick={() => navigate('/signup')}>Create Account</span>
                </div>
            </div>
        </>
    )
}

export default Login;


