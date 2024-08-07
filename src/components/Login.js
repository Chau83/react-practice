import { useEffect, useState } from 'react';
import { loginAPI } from '../services/UserService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      navigate('/');
      toast.warning('You already login');
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);
    let res = await loginAPI(email, password);
    if (res && res.token) {
      localStorage.setItem('token', res.token);
      navigate('/');
    } else {
      //error
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div className='login-container col-12 col-sm-4'>
        <div className='title'>Log in</div>
        <div className='text'>Email or Username (eve.holt@reqres.in)</div>
        <input
          type='text'
          placeholder='Email...'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className='input-password'>
          <input
            type={isShowPassword === false ? 'password' : 'text'}
            placeholder='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <i
            className={
              isShowPassword === false
                ? 'fa-solid fa-eye-slash'
                : 'fa-solid fa-eye'
            }
            onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        </div>
        <button
          className={email && password ? 'active' : ''}
          disabled={email && password ? false : true}
          onClick={() => handleLogin()}
        >
          {loading && <i className='fa-solid fa-sync fa-spin me-2'></i>}
          Login
        </button>
        <div className='back'>
          <i className='fa-solid fa-angles-left me-2'></i>
          Go Back
        </div>
      </div>
    </>
  );
};

export default Login;
