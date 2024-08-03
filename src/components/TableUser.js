import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';

const TableUser = (props) => {
  const [listUsers, setListUser] = useState([]);

  useEffect(() => {
    //call apis
    //dry
    getUser();
  }, []);

  const getUser = async (user) => {
    let res = await fetchAllUser();

    if (res && res.data) {
      setListUser(res.data);
    }
  };
  console.log(listUsers);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
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
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default TableUser;
