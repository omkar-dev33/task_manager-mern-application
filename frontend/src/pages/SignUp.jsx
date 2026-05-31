import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api.js'

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {
            await API.post('/auth/signup', {
                name,
                email,
                password
            });

            alert("Registration Successful");

            navigate("/");

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex flex-col w-[450px] rounded-sm h-auto justify-center items-center">
                <h3 className="mb-4">SignUp</h3>
                <form onSubmit={handleRegister} className="flex flex-col items-center">
                    <div className="mb-4">
                        <label htmlFor="name" className="">Name : </label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="border border-black" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="">Email : </label>
                        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-black" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="">Password : </label>
                        <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-black" />
                    </div>

                    <div className="w-full flex justify-center gap-2">
                        <button type="submit" className=" border border-black rounded-md  w-[100px] mt-4"> {loading ? "Signing up..." : "Sign Up"} </button>
                        <button type="button" className=" border border-black rounded-md  w-[100px] mt-4" onClick={() => navigate("/")}>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp;



