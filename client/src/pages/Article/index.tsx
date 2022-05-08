import React, {
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
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
} from '@blueprintjs/core';
import { Footer } from '../../components/Footer';
import { Article } from '../../utils/dto/article';
import { Category } from '../../utils/dto/category';
import { articleApi } from '../../utils/store/api/article';
import { categoryApi } from '../../utils/store/api/category';
import { treeReducer, NodePath } from './drawerFunctions';
import mainPage from './mainPageData';

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
  categories: Category[] | undefined
): TreeNodeInfo[] => {
  const tree: TreeNodeInfo[] = [
    {
      id: 0,
      label: <NavLink to="/">Главная</NavLink>,
      isSelected: true,
    },
  ];

  if (!articles || !categories) {
    return tree;
  }

  let index = 1;

  const newTree = categories.map((category) => {
    const categoryIndex = index;

    const children = articles
      .filter((article) => article.category === category._id)
      .map((article) => {
        index += 1;

        return {
          id: index,
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
    };
  });

  return newTree;
};

const renderArticle = (article: Article | undefined) => {
  if (!article) {
    return <Fragment />;
  }
  console.log(article);
  return (
    <>
      <H5 className="article__header">Название сегмента</H5>
      <p className="article__text">Название сегмента</p>
    </>
  );
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

  if (articlesError) {
    console.log(articlesError);
  }

  if (categoriesError) {
    console.log(categoriesError);
  }

  const article = articles?.find((item) => item.slug === slug);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [articlesTree, dispatch] = useReducer(
    treeReducer,
    createArticlesTree(articles, categories)
  );

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

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
      if (_node.hasCaret || _node.isSelected) {
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

  useEffect(() => {
    if (!articlesLoading && !categoriesLoading) {
      dispatch({
        type: 'UPDATE_TREE',
        payload: { newState: createArticlesTree(articles, categories) },
      });
    }
  }, [articlesLoading, categoriesLoading, articles, categories]);

  return (
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
            icon={<Icon icon="cross" size={IconSize.LARGE} intent="primary" />}
            minimal
          />
          <H3 className="drawer__title">Говнолор</H3>
        </div>
        <div className="drawer__content">
          {articlesLoading || categoriesLoading || (
            <Tree
              contents={articlesTree}
              onNodeClick={handleNodeClick}
              onNodeCollapse={handleNodeToggle}
              onNodeExpand={handleNodeToggle}
              className="drawer__tree"
            />
          )}
        </div>
      </Drawer>
      <div className="wrapper wrapper_footer">
        <div className="header">
          <Button
            className="header__button button button_nobg"
            onClick={handleDrawerToggle}
            icon={<Icon icon="menu" size={IconSize.LARGE} intent="primary" />}
            minimal
          />
          <H3 className="header__text header__text_center">{mainPage.title}</H3>
        </div>
        <div className="article">
          {articlesLoading || renderArticle(article)}
          <H5 className="article__header">Название сегмента</H5>
          <p className="article__text">{mainPage.content}</p>
          <H5 className="article__header">Название сегмента</H5>
          <p className="article__text">{mainPage.content}</p>
          <H5 className="article__header">Название сегмента</H5>
          <p className="article__text">{mainPage.content}</p>
          <H5 className="article__header">Название сегмента</H5>
          <p className="article__text">{mainPage.content}</p>
          <H5 className="article__header">Название сегмента</H5>
          <p className="article__text">{mainPage.content}</p>
          <H5 className="article__header">Название сегмента</H5>
          <p className="article__text">{mainPage.content}</p>
          <H5 className="article__header">Название сегмента</H5>
          <p className="article__text">{mainPage.content}</p>
          <H5 className="article__header">Название сегмента</H5>
          <p className="article__text">{mainPage.content}</p>
          <H5 className="article__header">Название сегмента</H5>
          <p className="article__text">{mainPage.content}</p>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};
