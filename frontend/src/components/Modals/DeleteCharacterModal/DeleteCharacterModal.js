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
        className="p-5 rounded-2xl bg-gray-600 text-white font-bold bg-gradient-to-b"
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
