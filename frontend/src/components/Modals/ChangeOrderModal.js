import { useState } from "react";
import { Modal } from "../../context/Modal";
import ChangeOrder from "../ChangeOrder";
import { useDispatch } from "react-redux";
import "./ChangeOrderModal.css";
import { storingChangeList } from "../../store/list";

const ChangeOrderModal = ({ lists, setShowChangeOrder, showChangeOrder }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  return (
    <div>
      <button
        className="confirmationBoxModal-btn"
        onClick={async () => {
          await dispatch(storingChangeList({ lists: lists, type: "open" }));
          await setShowModal(true);
        }}
      >
        Change Order
      </button>
      {showModal && (
        <Modal
          onClose={async () => {
            await dispatch(storingChangeList({ lists: lists, type: "close" }));
            await setShowModal(false);
          }}
        >
          <ChangeOrder
            lists={lists}
            setShowChangeOrder={setShowChangeOrder}
            showChangeOrder={showChangeOrder}
            closeModal={setShowModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default ChangeOrderModal;
