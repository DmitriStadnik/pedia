import { Spinner, Tab, TabId, Tabs } from '@blueprintjs/core';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { articleApi } from '../../../utils/store/api/article';
import { AdminTable } from '../AdminTable';
import { EditArticle } from '../EditArticle';
import { articlesColumns, categoriesColumns } from './columns';

export const AdminContent: React.FC = () => {
  const location = useLocation();

  if (location.pathname.includes('edit/article')) {
    return <EditArticle />;
  }

  const {
    data: articles,
    error: articlesError,
    isLoading: articlesLoading,
  } = articleApi.useGetListQuery();

  if (articlesError) {
    console.log(articlesError);
  }

  const [categories] = useState<any>([]);
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
