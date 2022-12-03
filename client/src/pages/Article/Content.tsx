import React, { Fragment, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { H3, H5, Button, Icon, IconSize } from '@blueprintjs/core';
import { renderArticle } from './utils';
import { Config } from '../../utils/dto/config';
import { Article } from '../../utils/dto/article';

import './Article.css';

interface ArticleContentProps {
  articles: Article[];
  article: Article | undefined;
  config: Config;
  handleDrawerToggle: () => void;
  handleImageClick: (title: string, src: string) => void;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({
  handleDrawerToggle,
  handleImageClick,
  articles,
  article,
  config,
}) => {
  const getPageTitle = useMemo(() => {
    if (!article) {
      const title = config ? config.title : '';

      return title;
    }

    return article.title;
  }, [article, config]);

  const getContent = useMemo(() => {
    if (!article) {
      const content = config ? config.mainPageContent : '';

      return renderArticle(content, handleImageClick, articles || []);
    }

    return renderArticle(article.content, handleImageClick, articles || []);
  }, [article, config]);

  const getLinks = useCallback(
    (linkedArticles: string[]) => {
      if (!articles) {
        return <Fragment />;
      }

      return articles
        .filter((item) => linkedArticles.includes(item._id))
        .map((item) => (
          <Link
            to={`/article/${item.slug}`}
            key={item.slug}
            className="link__linked"
          >
            {item.title}
          </Link>
        ));
    },
    [articles]
  );

  return (
    <div className="wrapper wrapper_footer">
      <div className="header">
        <Button
          className="header__button button button_nobg"
          onClick={handleDrawerToggle}
          icon={<Icon icon="menu" size={IconSize.LARGE} intent="primary" />}
          minimal
        />
        <H3 className="header__text header__text_center">{getPageTitle}</H3>
      </div>
      <div className="article">{getContent}</div>
      {article && article.linkedArticles.length > 0 && (
        <div className="links">
          <H5 className="article__header">Ссылки</H5>
          {getLinks(article.linkedArticles)}
        </div>
      )}
    </div>
  );
};
