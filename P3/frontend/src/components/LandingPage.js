import React from 'react';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to Our App</h1>
      <p>
        Please <a href="/login">login</a> or{' '}
        <a href="/signup">create an account</a> to get started.
      </p>
    </div>
  );
};

export default LandingPage;
