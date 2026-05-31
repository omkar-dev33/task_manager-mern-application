import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const res = await API.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);

            navigate("/home");

        } catch (error) {
            console.log(error);
            alert("Login Failed");
        }
    }

    return (
        <>
            <div className="flex flex-col w-[350px] rounded-sm h-auto justify-center items-center">

                <div className="mb-4">
                    <label>Email : </label>

                    <input
                        type="text"
                        value={email}
                        className="border-2 border-black"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password : </label>

                    <input
                        type="password"
                        value={password}
                        className="border-2 border-black"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    className="mt-3 rounded-lg border-2 px-2 py-1 text-black"
                    onClick={handleLogin}
                >
                    Login
                </button>

                <div className="">Don't have account ? <span onClick={() => navigate("/signup")}>Create Account</span></div>
            </div>
        </>
    )
}

export default Login;

