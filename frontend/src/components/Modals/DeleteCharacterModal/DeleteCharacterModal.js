import { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteCharacter from "./DeleteCharacter";
import { useDispatch } from "react-redux";

const DeleteCharacterModal = ({
  lists,
  setShowChangeOrder,
  showChangeOrder,
}) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  return (
    <div>
      <button
        className="modal-btn"
        onClick={async () => {
          await setShowModal(true);
        }}
      >
        Delete
      </button>
      {showModal && (
        <Modal
          onClose={async () => {
            await setShowModal(false);
          }}
        >
          <DeleteCharacter
            lists={lists}
            setShowModal={setShowModal}
            showModal={showModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default DeleteCharacterModal;
