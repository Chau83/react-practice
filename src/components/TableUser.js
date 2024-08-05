import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _ from 'lodash';

const TableUser = (props) => {
  const [listUsers, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowMobalEditUser, setIsShowMobalEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowMobalEditUser(false);
  };

  const handleUpdate = (user) => {
    setListUser([user, ...listUsers]);
  };

  const handleEditUserFromModal = (user) => {
    let clone = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    clone[index].first_name = user.first_name;
    setListUser(clone);
  };

  useEffect(() => {
    //call apis
    //dry
    getUser(1);
  }, [totalPages]);

  const getUser = async (page) => {
    let res = await fetchAllUser(page);

    if (res && res.data) {
      setTotalUsers(res.total);
      setListUser(res.data);
      setTotalPages(res.total_pages);
    }
  };

  const handlePageClick = (event) => {
    getUser(+event.selected + 1);
  };

  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowMobalEditUser(true);
  };

  return (
    <>
      <div className='my-3 add-new'>
        <span>
          <b>List User:</b>
        </span>
        <button
          className='btn btn-success'
          onClick={() => setIsShowModalAddNew(true)}
        >
          Add New User
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => (
              <tr key={`users-${index}`}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <button
                    className='btn btn-warning mx-3'
                    onClick={() => {
                      setIsShowMobalEditUser(true);
                      handleEditUser(user);
                    }}
                  >
                    Edit
                  </button>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel='...'
        nextLabel='next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={totalPages}
        previousLabel='< previous'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
      />

      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
      />

      <ModalEditUser
        show={isShowMobalEditUser}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />
    </>
  );
};

export default TableUser;
