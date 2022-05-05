import { HTMLTable } from '@blueprintjs/core';
import React, { Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { isDate } from '../../../utils/utils';

import './AdminTable.css';

interface AdminTableColumn {
  title: string;
  key: string;
}

interface AdminTableProps {
  columns: AdminTableColumn[];
  content?: Array<Record<string, any>>;
  editPath?: string;
}

const renderCellContent = (item: any): string => {
  if (item.constructor === Array) {
    return `${item.length}`;
  }

  const date = new Date(item);

  if (
    date instanceof Date &&
    date.toString() !== 'Invalid Date' &&
    isDate(item)
  ) {
    return (
      ('0' + date.getDate()).slice(-2) +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      date.getFullYear() +
      ' ' +
      ('0' + date.getHours()).slice(-2) +
      ':' +
      ('0' + date.getMinutes()).slice(-2)
    );
  }

  return `${item}`;
};

export const AdminTable: React.FC<AdminTableProps> = ({
  columns,
  content = null,
  editPath = null,
}) => {
  if (!content || !content.length) {
    return <Fragment />;
  }

  const navigate = useNavigate();

  const handleRowClick = useCallback(
    (id: number) => {
      if (!editPath) {
        return;
      }

      navigate(`/admin/${editPath}/${id}`);
    },
    [editPath]
  );

  return (
    <Fragment>
      <div className="table">
        <HTMLTable condensed striped interactive>
          <thead>
            <tr>
              <th>#</th>
              {columns.map((column) => (
                <th key={column.key}>{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.map((item, index) => (
              <tr onClick={() => handleRowClick(item._id)} key={item._id}>
                <td>{index + 1}</td>
                {columns.map((column) => (
                  <td key={`${column.key}-${item[column.key]}`}>
                    {renderCellContent(item[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      </div>
    </Fragment>
  );
};
