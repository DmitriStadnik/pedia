import { HTMLTable } from '@blueprintjs/core';
import React, { Fragment } from 'react';

export const ArticlesTable: React.FC = () => {
  return (
    <Fragment>
      <div className="table">
        <HTMLTable condensed striped interactive>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Category</th>
              <th>Links</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Энциклопедия Говнолора</td>
              <td>encyclopedia_govnolor</td>
              <td>Мир</td>
              <td>5</td>
              <td>2022-03-07</td>
              <td>2022-03-09</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Энциклопедия Говнолора</td>
              <td>encyclopedia_govnolor</td>
              <td>Мир</td>
              <td>5</td>
              <td>2022-03-07</td>
              <td>2022-03-09</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Энциклопедия Говнолора</td>
              <td>encyclopedia_govnolor</td>
              <td>Мир</td>
              <td>5</td>
              <td>2022-03-07</td>
              <td>2022-03-09</td>
            </tr>
          </tbody>
        </HTMLTable>
      </div>
    </Fragment>
  );
};
