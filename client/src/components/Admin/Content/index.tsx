import { Tab, TabId, Tabs } from '@blueprintjs/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AdminApi } from '../../../utils/api/AdminApi';
import { AdminTable } from '../AdminTable';
import { EditArticle } from '../EditArticle';
import {
  // articles,
  articlesColumns,
  // categories,
  categoriesColumns,
} from './testData';

const adminApi = new AdminApi();

export const AdminContent: React.FC = () => {
  const location = useLocation();
  const [articles, setArticles] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<TabId>('articles');

  const handleTabChange = (navbarTabId: TabId) => setActiveTab(navbarTabId);

  const fetchItems = useCallback(async () => {
    switch (activeTab) {
      case 'articles':
        setArticles(await adminApi.getArticles());
        return;
      case 'categories':
        setCategories(await adminApi.getArticles());
        return;
    }
  }, [activeTab]);

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

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
