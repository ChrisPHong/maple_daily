import { useState } from "react"
import { useDispatch } from "react-redux";
import {createTask} from '../../../store/list'

const TaskForm = ({props}) =>{
const [obj, setObj] = useState('');
const dispatch = useDispatch();

const onSubmit = async (e) =>{
    e.preventDefault();
    const payload = props
    payload.objective = obj
   await dispatch(createTask(props));

}
return (

    <form>
        <label>
            objective
            <input onChange={(e)=>{setObj(e.target.value)}}></input>
        </label>

    <button onClick={onSubmit}>
        Submit Task
    </button>
</form>
)

}



export default TaskForm
