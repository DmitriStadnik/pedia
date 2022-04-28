import { HTMLTable } from '@blueprintjs/core';
import React, { Fragment } from 'react';

const articles = [
  {
    title: 'Энциклопедия Говнолора',
    slug: 'encyclopedia_govnolor',
    category: 'Мир',
    linkedArticles: '5',
    dateCreated: '2022-03-09',
    dateUpdated: '2022-03-07',
  },
  {
    title: 'Энциклопедия Говнолора 2',
    slug: 'encyclopedia_govnolor_2',
    category: 'Мир',
    linkedArticles: '4',
    dateCreated: '2022-02-09',
    dateUpdated: '2022-02-07',
  },
  {
    title: 'Энциклопедия Говнолора 3',
    slug: 'encyclopedia_govnolor_3',
    category: 'Мир',
    linkedArticles: '2',
    dateCreated: '2022-02-19',
    dateUpdated: '2022-02-07',
  },
];

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
            {articles.map((article, index) => (
              <tr
                onClick={() => console.log(`clicked article ${article.title}`)}
                key={article.slug}
              >
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.slug}</td>
                <td>{article.category}</td>
                <td>{article.linkedArticles}</td>
                <td>{article.dateCreated}</td>
                <td>{article.dateUpdated}</td>
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      </div>
    </Fragment>
  );
};
