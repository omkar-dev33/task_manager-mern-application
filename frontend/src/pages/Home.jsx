import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskContext from '../context/Taskcontext'
import Dropdown from '../component/Dropdown';
import API from '../api.js';

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

    const [date, setDate] = useState("");

    const [search, setSearch] = useState("");

    const { task, setTask, setEditTask } = useContext(TaskContext);

    const navigate = useNavigate();

    const sortedTask = [...task];

    let finalTasks = [...task];


    if (search) {
        // Searching
        finalTasks = finalTasks.filter((t) =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.description.toLowerCase().includes(search.toLowerCase())
        );

    }

    // Status filter

    if (selected === "In Progress") {
        finalTasks = finalTasks.filter((t) => t.status === "In Progress");
    } else if (selected === "Done") {
        finalTasks = finalTasks.filter((t) => t.status === "Done");
    }

    // sorting
    if (selectOrder == "Newest First") {
        finalTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (selectOrder == "Oldest First") {
        finalTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    useEffect(() => {
        getTask();
    }, [])

    const getTask = async () => {
        try {

            const res = await API.get("/tasks"); // API to get tasks
            setTask(res.data);
            console.log("Task comming...");

        } catch (error) {
            console.log("error", error.message);
        }
    }

    const addTask = async () => {

        if (!title.trim() || !description.trim()) {
            window.alert("Both fields are required");
        } else {

            try {
                const res = await API.post("/tasks", { // Create Task
                    title: title,
                    description: description,
                    status: status,
                    priority: priority,
                    date: date
                });

                setTask((prev) => { return [...prev, res.data] });

                setTitle("");
                setDescription("");
                setStatus("To Do");
                setPriority("Medium");
                setPop(false);

            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleEdit = (item) => {
        setEditTask(item);
        navigate("/edit");
    }

    const deleteTask = async (id) => {

        if (!window.confirm('Are you sure you want to delete ?')) return;

        try {
            await API.delete(`/tasks/${id}`);
            setTask(prev => prev.filter(t => t._id !== id));

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="">
            <section className="bg-yellow-500 p-2 flex flex-col w-[300px] h-auto">
                <input
                    type="text"
                    placeholder="Search task..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="rounded-lg border h-8" onClick={() => { setPop(!pop) }}>New Task</button>
            </section>


            {/* All Tasks */}
            <section className="relative">
                <button onClick={() => setOpen(!open)} className="text-md w-full flex justify-between px-2 border-2 outline-none rounded-md mt-3" >
                    <span className="" >{selected}</span>
                    <span className="" >...</span>
                </button>

                {
                    open && (
                        <section className="relative">
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
                        </section>
                    )
                }

                {/* Selected order */}
                <button onClick={() => setOrder(!order)} className="text-md w-full flex justify-between px-2 border-2 outline-none rounded-md mt-3" >
                    <span className="" >{selectOrder}</span>
                    <span className="" >...</span>
                </button>

                {order && (
                    <section className="relative">
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
                    </section>
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

                            <input type="date" value={date} className="" onChange={(e) => setDate(e.target.value)} />

                            <button className="w-full bg-red-100" onClick={addTask}>ADD</button>
                        </div>
                    </div>
                )
            }

            <div className="h-[220px] overflow-y-auto no-scrollbar">
                {
                    /* 1. Ensure 'task' is a valid array */
                    Array.isArray(task) && (

                        /* 2. Check if your filtered results have items */
                        finalTasks.length > 0 ? (

                            // If tasks match your search/filters, render them
                            finalTasks.map((task, index) => (
                                <div key={task._id} className="border px-2 py-2 mt-4 rounded h-auto bg-blue-300">
                                    <label htmlFor="title" className="">Title :</label>
                                    <h3 id="title" className="font-bold my-1">{task.title}</h3>

                                    <label htmlFor="description" className=" my-1" >Description :</label>
                                    <p className="font-bold">{task.description}</p>

                                    <div className=" mt-1 flex flex-col">
                                        <p className="">Status : {task.status} </p>
                                        <p className="">Priority : {task.priority}</p>
                                        <p className="">Date : {task.date ? new Date(task.date).toLocaleDateString() : "No date"}</p>
                                    </div>

                                    <div className="w-full flex flex-row gap-2">
                                        <button className="bg-white w-full mt-2 rounded-md" onClick={() => { handleEdit(task) }}>Edit</button>
                                        <button className="bg-white w-full mt-2 rounded-md" onClick={() => { deleteTask(task._id) }}>Delete</button>
                                    </div>
                                </div>
                            ))
                        ) : (

                            // 3. Fallback message shown when finalTasks is empty
                            <div className="flex flex-col items-center justify-center p-6 mt-4 border border-dashed border-gray-400 rounded-md bg-gray-50 text-center">
                                <p className="text-red-600 font-bold text-lg">Not found!</p>
                                <p className="text-gray-500 text-xs mt-1">No tasks match your search or filter options.</p>
                            </div>
                        )
                    )
                }
            </div>

        </div >

    )
}

export default Home;






