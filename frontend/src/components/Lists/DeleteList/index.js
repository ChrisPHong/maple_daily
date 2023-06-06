import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletingList } from "../../../store/list";
import "./deletelist.css";

const DeleteList = ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const deleteClick = () => {
    dispatch(deletingList({ id }));
  };
  return (
    <>
      <button className="delete-btn" onClick={deleteClick}>
        X
      </button>
    </>
  );
};

export default DeleteList;
