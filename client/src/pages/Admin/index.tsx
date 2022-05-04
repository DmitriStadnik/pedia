import { H3, Spinner } from '@blueprintjs/core';
import React, { Fragment, useState } from 'react';
import { AdminContent } from '../../components/Admin/Content';
import { Login } from '../../components/Admin/Login';

import './Admin.css';

export const Admin: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  const handleLogin = (password: string) => {
    setIsLoading(true);

    if (!password || password.length === 0) {
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    setLoggedIn(true);
  };

  return (
    <Fragment>
      <div className="wrapper">
        <div className="header">
          <H3 className="header__text">Admin panel</H3>
        </div>
        {isLoading ? (
          <Spinner className="admin__spinner" />
        ) : (
          <Fragment>
            {loggedIn ? <AdminContent /> : <Login handleLogin={handleLogin} />}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
