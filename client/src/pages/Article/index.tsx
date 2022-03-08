import React, { Fragment, ReactNode, useCallback, useReducer, useState } from 'react';
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
import { Footer } from '../../components/Footer';

import {treeReducer, NodePath} from './drawerFunctions';
import mainPage from './mainPageData';

import './Article.css';

const NavLink: React.FC<{to: string, children: ReactNode}> = ({to, children}) => (
  <Link className='drawer__link' to={to}>{children}</Link>
);

const INITIAL_STATE: TreeNodeInfo[] = [
  {
    id: 6,
    label: (<NavLink to='/'>Главная</NavLink>),
    isSelected: true,
  },
  {
    id: 0,
    hasCaret: true,
    label: 'folder0',
    childNodes: [
      {
        id: 1,
        label: (<NavLink to='/article/123'>Главная</NavLink>),
      },
      {
        id: 2,
        label: (<NavLink to='/article/123'>Главная</NavLink>),
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
