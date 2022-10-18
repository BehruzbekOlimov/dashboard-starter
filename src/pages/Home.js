import React from 'react';

const Home = ({initialLoading}) => {
  return (
    <div>
      Home
        {initialLoading ? <p>Loading...</p>:<p>Data...</p>}
    </div>
  );
};

export default Home;
