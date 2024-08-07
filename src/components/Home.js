const Home = () => {
  return (
    <>
      <div className='home-container jumbotron'>
        <div className='container'>
          <h1 className='display-3'>Hello Guys</h1>
          <p>This is an App for practice with reactjs</p>
          <p>
            This App have validate, router, fetch API from reqes.in and CRUD the
            users
          </p>
          <p>
            To login use this email: <strong>eve.holt@reqres.in</strong>
          </p>
          <p>
            {' '}
            and <strong>any</strong> password{' '}
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
