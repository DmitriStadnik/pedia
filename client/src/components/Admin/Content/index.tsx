import { Tab, TabId, Tabs } from '@blueprintjs/core';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AdminTable } from '../AdminTable';
import { EditArticle } from '../EditArticle';
import {
  articles,
  articlesColumns,
  categories,
  categoriesColumns,
} from './testData';

// import { AdminApi } from './AdminApi';

// const adminApi = new AdminApi();

export const AdminContent: React.FC = () => {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<TabId>('articles');

  const handleTabChange = (navbarTabId: TabId) => setActiveTab(navbarTabId);

  if (location.pathname.includes('edit/article')) {
    return <EditArticle />;
  }

  return (
    <Tabs
      id="AdminTabs"
      onChange={handleTabChange}
      selectedTabId={activeTab}
      animate={false}
    >
      <Tab
        id="articles"
        title="Articles"
        panel={
          <AdminTable
            columns={articlesColumns}
            content={articles}
            editPath="edit/article"
          />
        }
      />
      <Tab
        id="categories"
        title="Categories"
        panel={
          <AdminTable
            columns={categoriesColumns}
            content={categories}
            editPath="edit/category"
          />
        }
      />
    </Tabs>
  );
};
