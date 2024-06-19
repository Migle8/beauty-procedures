import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import CloseButton from 'react-bootstrap/esm/CloseButton';
import styles from "../styles/DeleteProcedure.module.css";
import { StateContext } from '../utils/StateContext';
import { deleteMyData } from '../services/delete';

function CancelProcedure({showCancel, setShowCancel, fprocedure}) {

    const {  setUpdate } = useContext(StateContext);

    const navigate = useNavigate();

    const { deleteCloseBtn, deleteConfirm, deleteModalBtns, deleteCancelBtn } = styles;

  
    const handleClose = () => {
      setShowCancel(false);
    };
  
  
    const cancelHandler = async (id) => {
      await deleteMyData(id);
      setUpdate((update) => update + 1);
      navigate("/myprocedures");
    };

    return ( 
        <Modal
        show={showCancel}
        onHide={handleClose}
        data-bs-theme="dark"
      >
        <Modal.Body>
          <div className={deleteCloseBtn}>
            <CloseButton onClick={handleClose} />
          </div>
          <div className={deleteConfirm}>
            Are You sure, you want to cancel &quot;{fprocedure.name}&quot; procedure?
          </div>

          <div className={deleteModalBtns}>
            <Button
              onClick={handleClose}
              variant="dark"
              className={deleteCancelBtn}
            >
              Cancel
            </Button>
            <Button
              variant="warning"
              onClick={() => cancelHandler(fprocedure._id)}
            >
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
     );
}

export default CancelProcedure;