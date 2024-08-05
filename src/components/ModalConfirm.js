import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/UserService';
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteFromModal } = props;

  const confirmDelete = async () => {
    // your logic to delete the user
    let res = await deleteUser(dataUserDelete.id);
    if (res && +res.statusCode === 204) {
      handleClose();
      toast.success('Delete user successfully');
      handleDeleteFromModal(dataUserDelete);
    } else {
      toast.error('Failed to delete user');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete A User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='body-add-new'>
          Are you sure to delete this user?
          <br />
          Email: {dataUserDelete.email}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={() => confirmDelete()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
