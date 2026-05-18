import React from 'react'
const SignUp = () => {
    return (
        <>
            <div className="flex flex-col w-[450px] rounded-sm h-auto justify-center items-center">
                <h3 className="mb-4">SignUp</h3>
                <div className="flex flex-col items-center">
                    <div className="mb-4">
                        <label htmlFor="name" className="">Name : </label>
                        <input type="text" id="name" className="border border-black" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="">Email : </label>
                        <input type="text" id="email" className="border border-black" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="">Password : </label>
                        <input type="text" id="password" className="border border-black" />
                    </div>

                    <div className="w-full flex justify-center ">
                        <button className=" border border-black rounded-md  w-[100px] mt-4">Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;