import { H3, Tab, TabId, Tabs } from '@blueprintjs/core';
import React, { Fragment, useState } from 'react';
import { ArticlesTable } from '../../components/Admin/ArticlesTable';

import './Admin.css';

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('articles')

  const handleTabChange = (navbarTabId: TabId) => setActiveTab(navbarTabId);
  return (
    <Fragment>
      <div className="wrapper">
        <div className="header">
          <H3 className="header__text">Admin panel</H3>
        </div>
        <Tabs 
          id="AdminTabs" 
          onChange={handleTabChange} 
          selectedTabId={activeTab}
          animate={false}
        >
          <Tab id="articles" title="Articles" panel={<ArticlesTable />} />
          <Tab id="categories" title="Categories" panel={<p>22222222</p>} />
        </Tabs>
      </div>
    </Fragment>
  );
};
