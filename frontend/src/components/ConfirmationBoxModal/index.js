import { Modal } from '../../context/Modal';
import { useState } from 'react';
import ConfirmationBox from '../ConfirmationBox';
import './ConfirmationBoxModal.css'

const ConfirmationBoxModal = ({id}) =>{
    const [showModal, setShowModal] = useState(false);
    /* 
    - send in props to determine what kind of confirmation it is
    - use that prop to display on the button
    - based 
    */

    return (
      <div className='modal-container'>
        <button onClick={() => setShowModal(true)}> Delete</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
        <ConfirmationBox id={id} closeModal={setShowModal}/>
          </Modal>
        )}
      </div>
    );
}

export default ConfirmationBoxModal;