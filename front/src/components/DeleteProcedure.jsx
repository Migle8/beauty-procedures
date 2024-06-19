import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import CloseButton from 'react-bootstrap/esm/CloseButton';
import styles from "../styles/DeleteProcedure.module.css";
import { StateContext } from '../utils/StateContext';
import { deleteData } from "../services/delete";

function DeleteProcedure({showDelete, setShowDelete, fprocedure}) {
    const {  setUpdate } = useContext(StateContext);

    const navigate = useNavigate();

    const { deleteCloseBtn, deleteConfirm, deleteModalBtns, deleteCancelBtn } = styles;

  
    const handleClose = () => {
      setShowDelete(false);
    };
  
  
    const deleteHandler = async (id) => {
      await deleteData(id);
      setUpdate((update) => update + 1);
      navigate("/procedures");
    };

    return (
        <Modal
                show={showDelete}
                onHide={handleClose}
                data-bs-theme="dark"
              >
                <Modal.Body>
                  <div className={deleteCloseBtn}>
                    <CloseButton onClick={handleClose} />
                  </div>
                  <div className={deleteConfirm}>
                    Are You sure, you want to delete &quot;{fprocedure.name}&quot; procedure?
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
                      onClick={() => deleteHandler(fprocedure._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
    );
}

export default DeleteProcedure;