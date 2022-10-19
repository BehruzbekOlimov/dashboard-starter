import React from 'react';
import {Helmet} from "react-helmet";

const Home = ({initialLoading, initialData}) => {
  return (
    <div>
        <Helmet>
            <title>Home Page</title>
        </Helmet>
      Home
        {initialLoading ? <p>Loading...</p>:<p>Data...</p>}
    </div>
  );
};

export default Home;
