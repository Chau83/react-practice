import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import _ from 'lodash';
import { debounce } from 'lodash';
import './TableUser.scss';

const TableUser = (props) => {
  const [listUsers, setListUser] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const [isShowMobalEditUser, setIsShowMobalEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [sortBy, setSortBy] = useState('asc');
  const [sortField, setSortField] = useState('id');

  const [keywords, setKeywords] = useState('');

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowMobalEditUser(false);
    setIsShowModalDelete(false);
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

  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };

  const handleDeleteFromModal = (user) => {
    let clone = _.cloneDeep(listUsers);
    clone = clone.filter((item) => item.id !== user.id);
    setListUser(clone);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);

    setListUser(cloneListUsers);
  };

  const handleSearch = debounce((e) => {
    let term = e.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(term)
      );

      setListUser(cloneListUsers);
    } else {
      getUser(1);
    }
  }, 1000);

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
      <div className='col-6 my-3'>
        <input
          className='form-control'
          placeholder='Search user by email..'
          // value={keywords}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='sort-header'>
              <span>ID</span>
              <span>
                <i
                  className='fa-solid fa-arrow-down-long'
                  onClick={() => handleSort('desc', 'id')}
                ></i>
                <i
                  className='fa-solid fa-arrow-up-long'
                  onClick={() => handleSort('asc', 'id')}
                ></i>
              </span>
            </th>
            <th>
              <span>Email</span>
            </th>
            <th className='sort-header'>
              <span>First Name</span>
              <span>
                <i
                  className='fa-solid fa-arrow-down-long'
                  onClick={() => handleSort('desc', 'first_name')}
                ></i>
                <i
                  className='fa-solid fa-arrow-up-long'
                  onClick={() => handleSort('asc', 'first_name')}
                ></i>
              </span>
            </th>
            <th>
              <span>Last Name</span>
            </th>
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
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
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

      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteFromModal={handleDeleteFromModal}
      />
    </>
  );
};

export default TableUser;
