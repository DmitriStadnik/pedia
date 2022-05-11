import React, {
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Drawer,
  H3,
  H5,
  Position,
  Button,
  Icon,
  IconSize,
  Tree,
  TreeNodeInfo,
  Dialog,
  Spinner,
} from '@blueprintjs/core';
import parse, {
  domToReact,
  Element as HTMLParserElement,
  HTMLReactParserOptions,
} from 'html-react-parser';
import { Footer } from '../../components/Footer';
import { Article } from '../../utils/dto/article';
import { Category } from '../../utils/dto/category';
import { articleApi } from '../../utils/store/api/article';
import { categoryApi } from '../../utils/store/api/category';
import { configApi } from '../../utils/store/api/config';
import { treeReducer, NodePath } from './drawerFunctions';

import './Article.css';

interface NavLinkProps {
  to: string;
  children: ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <Link className="drawer__link" to={to}>
    {children}
  </Link>
);

const drawerProps = {
  autoFocus: true,
  canEscapeKeyClose: true,
  canOutsideClickClose: true,
  enforceFocus: true,
  hasBackdrop: true,
  position: Position.LEFT,
  usePortal: true,
};

const createArticlesTree = (
  articles: Article[] | undefined,
  categories: Category[] | undefined,
  selectedId: string
): TreeNodeInfo[] => {
  const mainPageNode: TreeNodeInfo = {
    id: 0,
    label: <NavLink to="/">Главная</NavLink>,
    isSelected: !selectedId,
  };
  if (!articles || !categories) {
    return [mainPageNode];
  }

  let index = 1;

  const newTree = [...categories]
    .sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }

      if (a.title > b.title) {
        return 1;
      }

      return 0;
    })
    .map((category) => {
      const categoryIndex = index;

      const children = [...articles]
        .filter((article) => article.category === category._id)
        .sort((a, b) => {
          if (a.isMainArticle) return -1;
          if (b.isMainArticle) return 1;

          if (a.title < b.title) {
            return -1;
          }

          if (a.title > b.title) {
            return 1;
          }

          return 0;
        })
        .map((article) => {
          index += 1;

          return {
            id: index,
            isSelected: selectedId === article._id,
            label: (
              <NavLink to={`/article/${article.slug}`}>{article.title}</NavLink>
            ),
          };
        });

      if (!children.length) {
        index += 1;
      }

      return {
        id: categoryIndex,
        hasCaret: true,
        label: category.title,
        childNodes: children,
        isExpanded: children.find((child) => child.isSelected) !== undefined,
      };
    });

  return [mainPageNode, ...newTree];
};

const renderArticle = (
  content: string,
  handleImageClick: (title: string, src: string) => void,
  articles: Article[]
) => {
  if (!content) {
    return <Fragment />;
  }

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof HTMLParserElement && domNode.attribs) {
        if (domNode.children.length === 0 && domNode.name !== 'img') {
          return <Fragment />;
        }

        if (domNode.name === 'h5') {
          return (
            <H5 className="article__header">{domToReact(domNode.children)}</H5>
          );
        }

        if (domNode.name === 'p') {
          return (
            <p className="article__text">
              {domToReact(domNode.children, options)}
            </p>
          );
        }

        if (domNode.name === 'a') {
          const linkHref = domNode.attribs.href;
          const article = articles.find((item) => item.title === linkHref);

          if (!article) {
            return <span>{domToReact(domNode.children)}</span>;
          }
          return (
            <Link className="article__link" to={`/article/${article.slug}`}>
              {domToReact(domNode.children)}
            </Link>
          );
        }

        if (domNode.name === 'img') {
          return (
            <div className="article__img_wrapper">
              <img
                className="article__img"
                src={domNode.attribs.src}
                alt={domNode.attribs.alt}
                onClick={() =>
                  handleImageClick(domNode.attribs.alt, domNode.attribs.src)
                }
              />
              <p className="article__img_text">{domNode.attribs.alt}</p>
            </div>
          );
        }
      }
    },
  };

  return parse(content, options);
};

export const ArticlePage: React.FC = () => {
  const { slug } = useParams();

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

  const {
    data: config,
    error: configError,
    isLoading: configLoading,
  } = configApi.useGetQuery();

  if (articlesError) {
    console.log(articlesError);
  }

  if (categoriesError) {
    console.log(categoriesError);
  }

  if (configError) {
    console.log(configError);
  }

  const article = articles?.find((item) => item.slug === slug);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [imageView, setImageView] = useState<{ title: string; src: string }>();
  const [articlesTree, dispatch] = useReducer(
    treeReducer,
    createArticlesTree(articles, categories, article?._id || '')
  );

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleImageClick = (title: string, src: string) => {
    setImageView({ title, src });
  };

  const handleNodeToggle = useCallback(
    (_node: TreeNodeInfo, nodePath: NodePath) => {
      dispatch({
        payload: { path: nodePath, isExpanded: !_node.isExpanded },
        type: 'SET_IS_EXPANDED',
      });
    },
    []
  );

  const handleNodeClick = useCallback(
    (_node: TreeNodeInfo, nodePath: NodePath) => {
      if (_node.hasCaret) {
        handleNodeToggle(_node, nodePath);
        return;
      }

      if (_node.isSelected) {
        return;
      }

      dispatch({ type: 'DESELECT_ALL' });
      dispatch({
        payload: { path: nodePath, isSelected: !_node.isSelected },
        type: 'SET_IS_SELECTED',
      });

      setDrawerOpen(false);
    },
    []
  );

  const isLoading = useMemo(() => {
    return articlesLoading || configLoading || categoriesLoading;
  }, [articlesLoading, configLoading, categoriesLoading]);

  const getMenuTitle = useMemo(() => {
    if (configLoading || !config) {
      return '';
    }

    return config.title;
  }, [config, configLoading]);

  const getPageTitle = useMemo(() => {
    if (configLoading || articlesLoading) {
      return '';
    }

    if (!article) {
      const title = config ? config.title : '';

      return title;
    }

    return article.title;
  }, [article, config, articlesLoading, configLoading]);

  const getContent = useMemo(() => {
    if (configLoading || articlesLoading) {
      return '';
    }

    if (!article) {
      const content = config ? config.mainPageContent : '';

      return renderArticle(content, handleImageClick, articles || []);
    }

    return renderArticle(article.content, handleImageClick, articles || []);
  }, [article, config, articlesLoading, configLoading]);

  const getLinks = useCallback(
    (linkedArticles: string[]) => {
      if (articlesLoading || !articles) {
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

  useEffect(() => {
    if (!articlesLoading && !categoriesLoading) {
      dispatch({
        type: 'UPDATE_TREE',
        payload: {
          newState: createArticlesTree(
            articles,
            categories,
            article?._id || ''
          ),
        },
      });
    }
  }, [articlesLoading, categoriesLoading, articles, categories, slug]);

  useEffect(() => {
    if (!article) {
      if (!config) {
        document.title = `404 - PEDIA`;
      } else {
        document.title = `${config.title} - PEDIA`;
      }
    } else {
      document.title = `${article?.title} - PEDIA`;
    }
  }, [article, config]);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Drawer
            className="drawer"
            isOpen={drawerOpen}
            onClose={handleDrawerToggle}
            {...drawerProps}
          >
            <div className="drawer__header">
              <Button
                className="drawer__button button button_nobg"
                onClick={handleDrawerToggle}
                icon={
                  <Icon icon="cross" size={IconSize.LARGE} intent="primary" />
                }
                minimal
              />
              <H3 className="drawer__title">{getMenuTitle}</H3>
            </div>
            <div className="drawer__content">
              <Tree
                contents={articlesTree}
                onNodeClick={handleNodeClick}
                onNodeCollapse={handleNodeToggle}
                onNodeExpand={handleNodeToggle}
                className="drawer__tree"
              />
            </div>
          </Drawer>
          <div className="wrapper wrapper_footer">
            <div className="header">
              <Button
                className="header__button button button_nobg"
                onClick={handleDrawerToggle}
                icon={
                  <Icon icon="menu" size={IconSize.LARGE} intent="primary" />
                }
                minimal
              />
              <H3 className="header__text header__text_center">
                {getPageTitle}
              </H3>
            </div>
            <div className="article">{getContent}</div>
            {article && article.linkedArticles.length > 0 && (
              <div className="links">
                <H5 className="article__header">Ссылки</H5>
                {getLinks(article.linkedArticles)}
              </div>
            )}
          </div>
          <Footer title={getMenuTitle} />
          {imageView !== undefined && (
            <Dialog
              isOpen={imageView !== undefined}
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
