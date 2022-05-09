import { H3, Spinner } from '@blueprintjs/core';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { AdminContent } from '../../components/Admin/Content';
import { Login } from '../../components/Admin/Login';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../utils/store/hooks';

import './Admin.css';
import { setToken } from '../../utils/store/slices/auth';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
});

export const Admin: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const authToken = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const handleLogin = async (password: string) => {
    setIsLoading(true);

    if (!password || password.length === 0) {
      setIsLoading(false);
      return;
    }

    try {
      const {
        data: { token },
      } = await axiosInstance.post('admin/auth/login', {
        username: 'Admin',
        password,
      });

      dispatch(setToken({ token }));
    } catch (error) {
      toast(`${error}`, {
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkLoginStatus = useCallback(() => {
    if (authToken) {
      setLoggedIn(true);
    }
  }, [authToken]);

  useEffect(() => {
    checkLoginStatus();
  }, [authToken]);

  return (
    <Fragment>
      <div className="wrapper">
        <div className="header">
          <H3 className="header__text">Admin Panel</H3>
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
