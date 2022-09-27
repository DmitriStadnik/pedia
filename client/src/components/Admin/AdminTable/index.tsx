import { Button, HTMLTable } from '@blueprintjs/core';
import React, { Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryApi } from '../../../utils/store/api/category';
import { isDate } from '../../../utils/utils';

import './AdminTable.css';

interface AdminTableColumn {
  title: string;
  key: string;
}

interface AdminTableProps {
  columns: AdminTableColumn[];
  reloadFunc: () => void;
  content?: Array<Record<string, any>>;
  editPath?: string;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  columns,
  reloadFunc,
  content = null,
  editPath = null,
}) => {
  const navigate = useNavigate();
  const { data: categories } = categoryApi.useGetListQuery();

  const renderCellContent = (item: any, key: string): string => {
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

    if (key === 'category' && categories && categories.length > 0) {
      const categoryMatch = categories.find(
        (category) => category._id === item
      );
      return categoryMatch ? categoryMatch.title : `${item}`;
    }

    return `${item}`;
  };

  const handleRowClick = useCallback(
    (id: number) => {
      if (!editPath) {
        return;
      }

      navigate(`/admin/${editPath}/${id}`);
    },
    [editPath]
  );

  const handleAddClick = useCallback(() => {
    if (!editPath) {
      return;
    }

    navigate(`/admin/${editPath}/new`);
  }, [editPath]);

  return (
    <Fragment>
      <div className="table">
        <div className="buttons">
          <Button minimal onClick={reloadFunc} icon="refresh" />
          <Button minimal onClick={handleAddClick} icon="plus" />
        </div>
        {content && content.length && (
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
                      {renderCellContent(item[column.key], column.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </HTMLTable>
        )}
      </div>
    </Fragment>
  );
};
