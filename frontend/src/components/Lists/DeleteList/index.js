import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { deletingList } from "../../../store/list";


const DeleteList = ({id}) =>{
const history = useHistory();
const dispatch = useDispatch();

const deleteClick = () =>{
dispatch(deletingList({id}));
}
    return (
        <>
        <button onClick={deleteClick}>Delete</button>
        </>
    )


}


export default DeleteList;
