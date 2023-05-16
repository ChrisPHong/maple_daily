import { useState } from "react"
import { useDispatch } from "react-redux";

const TaskForm = () =>{
const [obj, setObj] = useState('');
const dispatch = useDispatch();

const createTask = () =>{

}
return (

    <form>
        <label>
            objective
            <input></input>
        </label>

    <button onClick={createTask}>
        Submit Task
    </button>
</form>
)

}



export default TaskForm
