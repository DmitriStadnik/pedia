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
} from '@blueprintjs/core';
import parse, {
  domToReact,
  Element as HTMLParserElement,
} from 'html-react-parser';
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

  const newTree = categories.map((category) => {
    const categoryIndex = index;

    const children = articles
      .filter((article) => article.category === category._id)
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
  handleImageClick: (title: string, src: string) => void
) => {
  if (!content) {
    return <Fragment />;
  }

  return parse(content, {
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
            <p className="article__text">{domToReact(domNode.children)}</p>
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
  });
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

  const getTitle = useMemo(() => {
    if (articlesLoading) {
      return '';
    }
    if (!article) {
      return mainPage.title;
    }
    return article.title;
  }, [article]);

  const getContent = useMemo(() => {
    if (articlesLoading) {
      return '';
    }
    if (!article) {
      return renderArticle(mainPage.content, handleImageClick);
    }
    return renderArticle(article.content, handleImageClick);
  }, [article]);

  const getLinks = useCallback(
    (linkedArticles: string[]) => {
      if (articlesLoading || !articles) {
        return <Fragment />;
      }

      return articles
        .filter((item) => linkedArticles.includes(item._id))
        .map((item) => (
          <Link to={`/article/${item.slug}`} key={item.slug}>
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
          <H3 className="header__text header__text_center">{getTitle}</H3>
        </div>
        <div className="article">{getContent}</div>
        {!articlesLoading && article && article.linkedArticles.length > 0 && (
          <div className="links">
            <H5 className="article__header">Ссылки</H5>
            {getLinks(article.linkedArticles)}
          </div>
        )}
      </div>
      <Footer />
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
  );
};
