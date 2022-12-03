import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { Suggest2 } from '@blueprintjs/select';
import {
  Drawer,
  H3,
  Position,
  Button,
  Icon,
  IconSize,
  Tree,
  TreeNodeInfo,
  MenuItem,
} from '@blueprintjs/core';
import MiniSearch, { SearchResult } from 'minisearch';
import { categoryApi } from '../../utils/store/api/category';
import { treeReducer, NodePath } from './drawerFunctions';
import { Article } from '../../utils/dto/article';
import {
  createArticlesTree,
  renderSuggestItem,
  renderSuggestValue,
} from './utils';
import { Config } from '../../utils/dto/config';

import './Article.css';
import { useNavigate } from 'react-router-dom';

const drawerProps = {
  autoFocus: true,
  canEscapeKeyClose: true,
  canOutsideClickClose: true,
  enforceFocus: true,
  hasBackdrop: true,
  position: Position.LEFT,
  usePortal: true,
};

const searchItems: Article[] = [];

const miniSearch = new MiniSearch({
  idField: '_id',
  fields: ['content', 'title'],
  storeFields: ['content', 'title', 'slug'],
});

interface ArticleDrawerProps {
  articles: Article[];
  article: Article | undefined;
  config: Config;
  drawerOpen: boolean;
  setDrawerOpen: (newValue: boolean) => void;
  handleDrawerToggle: () => void;
}

export const ArticleDrawer: React.FC<ArticleDrawerProps> = ({
  articles,
  article,
  config,
  drawerOpen,
  setDrawerOpen,
  handleDrawerToggle,
}) => {
  const navigate = useNavigate();
  const { data: categories } = categoryApi.useGetListQuery();

  const [searchValue, setSearchValue] = useState('');
  const [articlesTree, dispatch] = useReducer(
    treeReducer,
    createArticlesTree(articles, categories, article?._id || '')
  );

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

  const searchSuggestions = useMemo(() => {
    return miniSearch.search(searchValue, { fuzzy: 0.25, combineWith: 'AND' });
  }, [searchValue]);

  const getMenuTitle = useMemo(() => {
    if (!config) {
      return '';
    }

    return config.title;
  }, [config]);

  const handleSuggestItemSelect = (result: SearchResult) => {
    setTimeout(() => {
      handleDrawerToggle();
      setSearchValue('');

      navigate(`/article/${result.slug}`);
    }, 300);
  };

  const handleQueryChange = (query: string) => {
    if (query.length < 2) {
      setSearchValue('');
      return;
    }
    setSearchValue(query);
  };

  const setSearchItems = useCallback(() => {
    if (!articles) {
      return;
    }

    const newArticles = articles.filter(
      (e) => !searchItems.find((item) => item._id === e._id)
    );

    miniSearch.addAll(newArticles);
    searchItems.push(...newArticles);
  }, [articles]);

  useEffect(() => {
    setSearchItems();

    dispatch({
      type: 'UPDATE_TREE',
      payload: {
        newState: createArticlesTree(articles, categories, article?._id || ''),
      },
    });
  }, [articles, categories, article, setSearchItems]);

  return (
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
        <H3 className="drawer__title">{getMenuTitle}</H3>
      </div>
      <div className="drawer__search">
        <Suggest2<SearchResult>
          items={searchSuggestions}
          itemRenderer={renderSuggestItem}
          noResults={<MenuItem disabled={true} text="No results" />}
          inputValueRenderer={renderSuggestValue}
          onItemSelect={handleSuggestItemSelect}
          onQueryChange={handleQueryChange}
          popoverProps={{ matchTargetWidth: true, minimal: true }}
        />
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
  );
};
