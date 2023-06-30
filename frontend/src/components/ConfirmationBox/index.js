import { deletingList } from "../../store/list";
import { useDispatch } from "react-redux";
import './ConfirmationBox.css'

const ConfirmationBox = ({ id, closeModal }) => {
  const dispatch = useDispatch();

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
          onClick={(e) => {
            e.preventDefault();
            dispatch(deletingList({ id }));
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
