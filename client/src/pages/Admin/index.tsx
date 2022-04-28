import { H3, Spinner, Tab, TabId, Tabs } from '@blueprintjs/core';
import React, { Fragment, useState } from 'react';
import { ArticlesTable } from '../../components/Admin/ArticlesTable';
import { Login } from '../../components/Admin/Login';
import { AdminApi } from './AdminApi';

import './Admin.css';

const adminApi = new AdminApi();

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('articles');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleTabChange = (navbarTabId: TabId) => setActiveTab(navbarTabId);

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

  const handleButton = async () => {
    try {
      const response = await adminApi.testError();

      console.log('axios response');
      console.log(response);
    } catch (error) {
      console.log('axios error');
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="wrapper">
        <div className="header">
          <H3 className="header__text">Admin panel</H3>
        </div>
        <button onClick={() => handleButton()}>test error</button>
        <button onClick={() => handleButton()}>test response</button>
        {isLoading ? (
          <Spinner className="admin__spinner" />
        ) : (
          <Fragment>
            {loggedIn ? (
              <Tabs
                id="AdminTabs"
                onChange={handleTabChange}
                selectedTabId={activeTab}
                animate={false}
              >
                <Tab id="articles" title="Articles" panel={<ArticlesTable />} />
                <Tab
                  id="categories"
                  title="Categories"
                  panel={<p>22222222</p>}
                />
              </Tabs>
            ) : (
              <Login handleLogin={handleLogin} />
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
