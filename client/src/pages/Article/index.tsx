import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, Spinner } from '@blueprintjs/core';
import { Footer } from '../../components/Footer';
import { articleApi } from '../../utils/store/api/article';
import { categoryApi } from '../../utils/store/api/category';
import { configApi } from '../../utils/store/api/config';
import { ArticleContent } from './Content';
import { ArticleDrawer } from './Drawer';

import './Article.css';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams();

  const {
    data: articles,
    error: articlesError,
    isLoading: articlesLoading,
  } = articleApi.useGetListQuery();

  const {
    error: categoriesError,
    isLoading: categoriesLoading,
  } = categoryApi.useGetListQuery();

  const {
    data: config,
    error: configError,
    isLoading: configLoading,
  } = configApi.useGetQuery();

  if (articlesError) {
    console.error(articlesError);
  }

  if (categoriesError) {
    console.error(categoriesError);
  }

  if (configError) {
    console.error(configError);
  }

  const article = useMemo(() => {
    return articles?.find((item) => item.slug === slug);
  }, [articles, slug]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [imageView, setImageView] = useState<{ title: string; src: string }>();

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handleImageClick = (title: string, src: string) => {
    setImageView({ title, src });
  };

  const isLoading = useMemo(() => {
    return articlesLoading || configLoading || categoriesLoading;
  }, [articlesLoading, configLoading, categoriesLoading]);

  const getMenuTitle = useMemo(() => {
    if (configLoading || !config) {
      return '';
    }

    return config.title;
  }, [config, configLoading]);

  useEffect(() => {
    if (!article) {
      if (!config) {
        document.title = `404 - PEDIA`;
      } else {
        document.title = `${config.title} - PEDIA`;
      }
    } else {
      document.title = `${article.title} - PEDIA`;
    }
  }, [article, config]);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          {articles && config && (
            <Fragment>
              <ArticleDrawer
                setDrawerOpen={setDrawerOpen}
                handleDrawerToggle={handleDrawerToggle}
                drawerOpen={drawerOpen}
                config={config}
                articles={articles}
                article={article}
              />
              <ArticleContent
                handleDrawerToggle={handleDrawerToggle}
                handleImageClick={handleImageClick}
                config={config}
                articles={articles}
                article={article}
              />
            </Fragment>
          )}
          <Footer title={getMenuTitle} />
          {!!imageView && (
            <Dialog
              isOpen={!!imageView}
              canEscapeKeyClose
              canOutsideClickClose
              isCloseButtonShown
              title={imageView?.title}
              onClose={() => setImageView(undefined)}
              className="modal"
            >
              <img
                className="modal__img"
                src={imageView?.src}
                alt={imageView?.title}
              />
            </Dialog>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
