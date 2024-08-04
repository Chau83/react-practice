import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdate } = props;
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);

    if (res && res.id) {
      handleClose();
      setName('');
      setJob('');
      toast.success('Create user success!');
      handleUpdate({ first_name: name, id: res.id });
      //success
    } else {
      toast.error('Create user failed!');
      //false
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
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
        <Button variant='primary' onClick={() => handleSaveUser()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddNew;
