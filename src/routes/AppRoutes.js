import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../components/Home';
import TableUser from '../components/TableUser';
import PrivateRoutes from './PrivateRoute';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/login' element={<Login />} />
        <Route
          path='/users'
          element={
            <PrivateRoutes path='users'>
              <TableUser />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
