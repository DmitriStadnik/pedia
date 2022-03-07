import React, { Fragment, useCallback, useReducer, useState } from 'react';
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

import './Article.css';

const INITIAL_STATE: TreeNodeInfo[] = [
  {
    id: 0,
    hasCaret: true,
    label: 'folder0',
    childNodes: [
      {
        id: 1,
        label: '123123123',
      },
      {
        id: 2,
        label: '123123123',
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

// const searchNodeAndReplace = (
//   nodes: TreeNodeInfo[],
//   node: TreeNodeInfo
// ): TreeNodeInfo[] => {
//   const id = node.id;
//   const nodeToReplaceIndex = nodes.findIndex((e) => e.id === id);

//   if (nodeToReplaceIndex !== -1) {
//     nodes[nodeToReplaceIndex] = node;
//   }

//   return nodes;
// };

type NodePath = number[];

type TreeAction =
  | { type: "SET_IS_EXPANDED"; payload: { path: NodePath; isExpanded: boolean } }
  | { type: "DESELECT_ALL" }
  | { type: "SET_IS_SELECTED"; payload: { path: NodePath; isSelected: boolean } };

function forEachNode(nodes: TreeNodeInfo[] | undefined, callback: (node: TreeNodeInfo) => void) {
  if (nodes === undefined) {
    return;
  }

  for (const node of nodes) {
    callback(node);
    forEachNode(node.childNodes, callback);
  }
}

function forNodeAtPath(nodes: TreeNodeInfo[], path: NodePath, callback: (node: TreeNodeInfo) => void) {
  callback(Tree.nodeFromPath(path, nodes));
}

function treeExampleReducer(state: TreeNodeInfo[], action: TreeAction) {
  switch (action.type) {
    case "DESELECT_ALL":
      const newState1 = [...state];
      forEachNode(newState1, node => (node.isSelected = false));
      return newState1;
    case "SET_IS_EXPANDED":
      const newState2 = [...state];
      forNodeAtPath(newState2, action.payload.path, node => (node.isExpanded = action.payload.isExpanded));
      return newState2;
    case "SET_IS_SELECTED":
      const newState3 = [...state];
      forNodeAtPath(newState3, action.payload.path, node => (node.isSelected = action.payload.isSelected));
      return newState3;
    default:
      return state;
  }
}

export const Article: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [articles, dispatch] = useReducer(treeExampleReducer, INITIAL_STATE);

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
            // onNodeClick={handleNodeClick}
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
