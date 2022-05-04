import { HTMLTable } from '@blueprintjs/core';
import React, { Fragment, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import './AdminTable.css';

interface AdminTableColumn {
  title: string;
  key: string;
}

interface AdminTableProps {
  columns: AdminTableColumn[];
  content: Array<{ id: number; [key: string]: any }>;
  editPath?: string;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  columns,
  content,
  editPath = null,
}) => {
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
              <tr onClick={() => handleRowClick(item.id)} key={item.id}>
                <td>{index + 1}</td>
                {columns.map((column) => (
                  <td key={`${column.key}-${item[column.key]}`}>
                    {item[column.key]}
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
