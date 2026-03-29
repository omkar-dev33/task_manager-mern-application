import { useState } from 'react'
import TaskContext from './Taskcontext'

const TaskProvider = ({ children }) => {

    const [task, setTask] = useState(null);

    return (
        <TaskContext.Provider value={{ task, setTask }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider;

