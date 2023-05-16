import { useState } from "react"
import { useDispatch } from "react-redux";
import {createTask} from '../../../store/task'

const TaskForm = ({props}) =>{
const [obj, setObj] = useState('');
const dispatch = useDispatch();

const onSubmit = (e) =>{
    e.preventDefault();
    const payload = props
    payload.objective = obj
    dispatch(createTask(props))
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
