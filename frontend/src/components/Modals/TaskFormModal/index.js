import { useState } from "react";
import { Modal } from "../../../context/Modal";
import TaskForm from "../../Tasks/TaskForm";

const TaskFormModal = ({ listId, userId }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        className="update-btn"
        onClick={async () => {
          await setShowModal(true);
        }}
      >
        Add Unique Task
      </button>
      {showModal && (
        <Modal
          onClose={async () => {
            await setShowModal(false);
          }}
        >
          <TaskForm
            setShowModal={setShowModal}
            showModal={showModal}
            listId={listId}
            userId={userId}
          />
        </Modal>
      )}
    </div>
  );
};

export default TaskFormModal;
