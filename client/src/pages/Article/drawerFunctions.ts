import { Tree, TreeNodeInfo } from '@blueprintjs/core';

export type NodePath = number[];

type TreeAction =
  | {
      type: 'SET_IS_EXPANDED';
      payload: { path: NodePath; isExpanded: boolean };
    }
  | { type: 'DESELECT_ALL' }
  | {
      type: 'SET_IS_SELECTED';
      payload: { path: NodePath; isSelected: boolean };
    };

function forEachNode(
  nodes: TreeNodeInfo[] | undefined,
  callback: (node: TreeNodeInfo) => void
) {
  if (nodes === undefined) {
    return;
  }

  for (const node of nodes) {
    callback(node);
    forEachNode(node.childNodes, callback);
  }
}

function forNodeAtPath(
  nodes: TreeNodeInfo[],
  path: NodePath,
  callback: (node: TreeNodeInfo) => void
) {
  callback(Tree.nodeFromPath(path, nodes));
}

export function treeReducer(state: TreeNodeInfo[], action: TreeAction) {
  switch (action.type) {
    case 'DESELECT_ALL':
      const newState1 = [...state];
      forEachNode(newState1, (node) => (node.isSelected = false));
      return newState1;
    case 'SET_IS_EXPANDED':
      const newState2 = [...state];
      forNodeAtPath(
        newState2,
        action.payload.path,
        (node) => (node.isExpanded = action.payload.isExpanded)
      );
      return newState2;
    case 'SET_IS_SELECTED':
      const newState3 = [...state];
      forNodeAtPath(
        newState3,
        action.payload.path,
        (node) => (node.isSelected = action.payload.isSelected)
      );
      return newState3;
    default:
      return state;
  }
}
