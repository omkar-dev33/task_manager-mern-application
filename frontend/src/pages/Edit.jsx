import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskContext from '../context/Taskcontext';
import API from '../api.js'

const Edit = () => {

    const [openStatus, setOpenStatus] = useState(false);
    const [status, setStatus] = useState("Status");
    const allStatus = ["To Do", "In Progress", "Done"];

    const [open, setOpen] = useState(false);
    const [priority, setPriority] = useState("Priority");
    const allPriority = ["High", "Medium", "Low"];

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const { task, setTask } = useContext(TaskContext);
    const { editTask } = useContext(TaskContext);

    useEffect(() => {
        if (editTask) {
            setTitle(editTask.title);
            setDescription(editTask.description);
            setStatus(editTask.status || "Status");
            setPriority(editTask.priority || "Priority");
        }
    }, [editTask]);

    const handleSave = async () => {
        try {
            const res = await API.put(`/tasks/${editTask._id}`, { // API for edit Task
                title,
                description,
                status,
                priority
            });

            const updateTask = task.map((t) =>
                t._id === editTask._id ? res.data : t
            );

            setTask(updateTask);
            navigate("/");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-white h-auto">

            <div className="flex flex-col mb-4 ">
                <label htmlFor="title" className="" >Title</label>
                <input type="text" id="title" value={title} className="border-2 border-black" onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="flex flex-col ">
                <label htmlFor="description" className="">Description</label>
                <textarea className="border-2 border-black" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            {/* Status */}
            <div className="relative">
                <div className="">
                    <button className="">
                        <span>{status}</span>
                        <span onClick={() => { setOpenStatus(!openStatus) }}>...</span>
                    </button>

                </div>

                {
                    openStatus && (
                        <div className="">
                            <ul className="absolute bg-white">
                                {allStatus.map((status, index) => (
                                    <li className=""
                                        key={index}
                                        onClick={() => {
                                            setStatus(status)
                                            setOpenStatus(false)
                                        }}
                                    >
                                        {status}
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
                    )
                }
            </div>


            {/* Priority */}
            <div className="">
                <div className="flex justify-between mt-3">
                    <button className="" onClick={() => { setOpen(!open) }}>
                        <span className="">{priority}</span>
                        <span className="">...</span>
                    </button>
                </div>

                {
                    open && (
                        <ul className="absolute bg-white px-2">
                            {
                                allPriority.map((priority, index) => (
                                    <li
                                        key={index}
                                        className=""
                                        onClick={
                                            () => {
                                                setPriority(priority)
                                                setOpen(false)
                                            }
                                        }
                                    >
                                        {priority}
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>

            {/* Date */}
            <div className="flex flex-col mt-3 ">
                <label htmlFor="date" className="text-md">Select Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    className="border-2 h-6 rounded"
                />
            </div>

            <div className="flex flex-col w-full gap-2 mt-6">
                <button className="w-full bg-orange-500 rounded-md items-center h-[30px]" onClick={handleSave}>Save Changes</button>
                <button className="w-full border-2 border-black rounded-md" onClick={() => navigate('/')}>Cancel</button>
            </div>
        </div >
    )
}

export default Edit;



