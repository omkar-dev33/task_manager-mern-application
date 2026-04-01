import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskContext from '../context/Taskcontext'
import Dropdown from '../component/Dropdown';

const Home = () => {
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState(false);

    const [pop, setPop] = useState(false);

    const [selected, setSelected] = useState("All Tasks");
    const [selectOrder, setSelectedOrder] = useState("Select Order");

    const allTaskOptions = ["All Tasks", "In Progress", "Done"];
    const orderOfTasks = ["Newest First", "Oldest First"];

    // const [task, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [status, setStatus] = useState("To Do");
    const allStatus = ['To Do', 'In Progress', 'Done'];

    const [priority, setPriority] = useState("Medium");
    const allPriorities = ['High', 'Medium', 'Low'];

    const { task, setTask } = useContext(TaskContext);

    const navigate = useNavigate();

    const addTask = () => {

        if (!title || !description) {
            window.alert("Both fields are required");
        } else {

            const newTask = { title: title, description: description, status: status, priority: priority };
            setTask((prev) => [...prev, newTask]);

            setTitle("");
            setDescription("");
            setStatus("To Do");
            setPriority("Medium");
            setPop(false);
        }
    }

    const handleEdit = (item) => {
        setTask(item);
        navigate("/edit");
    }

    return (
        <div className="">
            <section className="bg-yellow-500 p-2 flex flex-col w-[300px] h-auto">
                <input type="text" placeholder="Search task..." className="text-md p-1 border-none outline-none mb-3 rounded-md px-2" />
                <button className="rounded-lg border h-8" onClick={() => { setPop(!pop) }}>New Task</button>
            </section>


            {/* All Tasks */}
            <section className="relative">
                <button className="text-md w-full flex justify-between px-2 border-2 outline-none rounded-md mt-3" >
                    <span className="" >{selected}</span>
                    <span className="" onClick={() => setOpen(!open)}>...</span>
                </button>

                {
                    open && (
                        <ul className="absolute w-full border bg-white mt-0 p-2">
                            {
                                allTaskOptions.map((option, index) => (
                                    <li className="mb-2"
                                        key={index}
                                        onClick={() => {
                                            setSelected(option)
                                            setOpen(false)
                                        }}
                                    >
                                        {option}
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }

                {/* Selected order */}
                <button className="text-md w-full flex justify-between px-2 border-2 outline-none rounded-md mt-3" >
                    <span className="" >{selectOrder}</span>
                    <span className="" onClick={() => setOrder(!order)}>...</span>
                </button>

                {order && (
                    <ul className="absolute w-full bg-white p-2">
                        {
                            orderOfTasks.map((orders) => (
                                <li className="mb-1"
                                    key={orders}
                                    onClick={
                                        () => {
                                            setSelectedOrder(orders)
                                            setOrder(false)
                                        }
                                    }
                                >{orders}</li>
                            ))
                        }
                    </ul>
                )}
            </section>


            {
                pop && (
                    <div onClick={() => setPop(false)} className="fixed inset-0 bg-blue-500/40 flex flex-col items-center justify-center z-50">
                        <div onClick={(e) => e.stopPropagation()} className="bg-green-600 w-[350px] flex flex-col items-start gap-3 justify-center p-4 rounded-lg shadow-lg">
                            <input className="w-full p-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <textarea className="min-w-full p-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                            <Dropdown
                                options={allStatus}
                                value={status}
                                setValue={setStatus}
                            />

                            <Dropdown
                                options={allPriorities}
                                value={priority}
                                setValue={setPriority}
                            />

                            <button className="w-full bg-red-100" onClick={addTask}>ADD</button>
                        </div>
                    </div>
                )
            }

            <div className="h-[220px] overflow-y-auto no-scrollbar">
                {
                    task.map((task, index) => (

                        <div key={index} className="border px-2 py-2 mt-4 rounded h-auto bg-blue-300">

                            <label htmlFor="title" className="">Title :</label>
                            <h3 id="title" className="font-bold my-1">{task.title}</h3>
                               
                            <label htmlFor="description" className=" my-1" >Description :</label>
                            <p className="font-bold">{task.description}</p>

                            <div className=" mt-1 flex flex-col">
                                <p className="">Status : {task.status} </p>
                                <p className="">Priority : {task.priority}</p>
                            </div>

                            <button className="bg-white w-full mt-2 rounded-md" onClick={() => { handleEdit(task) }}>Edit</button>
                        </div>
                    ))
                }
            </div>

        </div >

    )
}

export default Home






