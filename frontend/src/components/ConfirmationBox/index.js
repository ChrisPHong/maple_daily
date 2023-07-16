import { deletingList } from "../../store/list";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./ConfirmationBox.css";

const ConfirmationBox = ({ id, closeModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="Confirmation-container">
      <h2>Are you sure you want to delete this list?</h2>
      <div className="btn-container">
        <button
          onClick={(e) => {
            e.preventDefault();
            closeModal(false);
          }}
          className="cancel-btn"
        >
          Cancel
        </button>
        <button
          onClick={async (e) => {
            e.preventDefault();
            await dispatch(deletingList({ id }));
            await history.push("/");
          }}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmationBox;
