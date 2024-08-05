import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateUser } from '../services/UserService';
import { toast } from 'react-toastify';

const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const handleEditUser = async () => {
    let res = await updateUser(name, job, dataUserEdit.id);

    if (res && res.updatedAt) {
      handleClose();
      setName('');
      setJob('');
      toast.success('Update user success!');
      handleEditUserFromModal({ first_name: name, id: dataUserEdit.id });
      //success
    } else {
      toast.error('Update user failed!');
      //false
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit A User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='body-add-new'>
          <div>
            <form>
              <div className='form-group'>
                <label htmlFor='exampleInputName1'>Name</label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleInputName1'
                  aria-describedby='inputName'
                  placeholder='Enter your name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputJob1'>Job</label>
                <input
                  type='text'
                  className='form-control'
                  id='exampleInputJob1'
                  placeholder='Your job name'
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={() => handleEditUser()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditUser;
