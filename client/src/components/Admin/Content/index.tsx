import { Spinner, Tab, TabId, Tabs } from '@blueprintjs/core';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { articleApi } from '../../../utils/store/api/article';
import { categoryApi } from '../../../utils/store/api/category';
import { AdminTable } from '../AdminTable';
import { EditArticle } from '../EditArticle';
import { EditCategory } from '../EditCategory';
import { articlesColumns, categoriesColumns } from './columns';

export const AdminContent: React.FC = () => {
  const location = useLocation();

  if (location.pathname.includes('edit/article')) {
    return <EditArticle />;
  }

  if (location.pathname.includes('edit/category')) {
    return <EditCategory />;
  }

  const {
    data: articles,
    error: articlesError,
    isLoading: articlesLoading,
  } = articleApi.useGetListQuery();

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = categoryApi.useGetListQuery();

  if (articlesError) {
    console.log(articlesError);
  }

  if (categoriesError) {
    console.log(articlesError);
  }

  const [activeTab, setActiveTab] = useState<TabId>('articles');

  const handleTabChange = (navbarTabId: TabId) => setActiveTab(navbarTabId);

  return (
    <Tabs
      id="AdminTabs"
      onChange={handleTabChange}
      selectedTabId={activeTab}
      animate={false}
    >
      {articlesLoading ? (
        <div className="admin__spinner_wrapper">
          <Spinner className="admin__spinner" />
        </div>
      ) : (
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
      )}

      {categoriesLoading ? (
        <div className="admin__spinner_wrapper">
          <Spinner className="admin__spinner" />
        </div>
      ) : (
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
      )}
    </Tabs>
  );
};
