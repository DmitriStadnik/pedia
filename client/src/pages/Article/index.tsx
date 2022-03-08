import React, { Fragment, useCallback, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
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
import mainPage from './mainPageData';
import {treeReducer, NodePath} from './drawerFunctions';

import './Article.css';

const INITIAL_STATE: TreeNodeInfo[] = [
  {
    id: 6,
    label: (<Link className='drawer__link' to='/'>Главная</Link>),
    isSelected: true,
  },
  {
    id: 0,
    hasCaret: true,
    label: 'folder0',
    childNodes: [
      {
        id: 1,
        label: (<Link className='drawer__link' to='/article/123'>Главная</Link>),
      },
      {
        id: 2,
        label: (<Link className='drawer__link' to='/article/123'>Главная</Link>),
      },
    ],
  },
  {
    id: 3,
    hasCaret: true,
    label: 'folder2',
    childNodes: [
      {
        id: 4,
        label: '123123123',
      },
      {
        id: 5,
        label: '123123123',
      },
    ],
  },
];

const drawerProps = {
  autoFocus: true,
  canEscapeKeyClose: true,
  canOutsideClickClose: true,
  enforceFocus: true,
  hasBackdrop: true,
  position: Position.LEFT,
  usePortal: true,
};

export const Article: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [articles, dispatch] = useReducer(treeReducer, INITIAL_STATE);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handleNodeToggle = useCallback(
    (_node: TreeNodeInfo, nodePath: NodePath) => {
      dispatch({
        payload: { path: nodePath, isExpanded: !_node.isExpanded },
        type: "SET_IS_EXPANDED",
      });
    },
    []
  );

  const handleNodeClick = useCallback(
    (_node: TreeNodeInfo, nodePath: NodePath) => {
      if (_node.hasCaret || _node.isSelected) {
        return
      }

      dispatch({type: "DESELECT_ALL"});
      dispatch({
        payload: { path: nodePath, isSelected: !_node.isSelected },
        type: "SET_IS_SELECTED",
      });

      setDrawerOpen(false)
    },
    []
  );

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
          <Tree
            contents={articles}
            onNodeClick={handleNodeClick}
            onNodeCollapse={handleNodeToggle}
            onNodeExpand={handleNodeToggle}
            className="drawer__tree"
          />
        </div>
      </Drawer>
      <div className="wrapper">
        <div className="header">
          <Button
            className="header__button button button_nobg"
            onClick={handleDrawerToggle}
            icon={<Icon icon="menu" size={IconSize.LARGE} intent="primary" />}
            minimal
          />
          <H3 className="header__text">{mainPage.title}</H3>
        </div>
        <div className="article">
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
    </Fragment>
  );
};
