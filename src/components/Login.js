import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <>
      <div className='login-container col-12 col-sm-4'>
        <div className='title'>Log in</div>
        <div className='text'>Email or Username</div>
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
        >
          Login
        </button>
        <div className='back'>
          <i className='fa-solid fa-angles-left me-1'></i>
          Go Back
        </div>
      </div>
    </>
  );
};

export default Login;
