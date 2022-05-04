export const categories = [
  {
    title: 'Категория 1',
    slug: 'category_1',
    id: 1,
  },
  {
    title: 'Категория 2',
    slug: 'category_2',
    id: 2,
  },
  {
    title: 'Категория 3',
    slug: 'category_3',
    id: 3,
  },
];

export const categoriesColumns = [
  {
    title: 'Title',
    key: 'title',
  },
  {
    title: 'Slug',
    key: 'slug',
  },
];

export const articles = [
  {
    title: 'Энциклопедия Говнолора',
    slug: 'encyclopedia_govnolor',
    category: 'Мир',
    linkedArticles: '5',
    dateCreated: '2022-03-09',
    dateUpdated: '2022-03-07',
    id: 1,
  },
  {
    title: 'Энциклопедия Говнолора 2',
    slug: 'encyclopedia_govnolor_2',
    category: 'Мир',
    linkedArticles: '4',
    dateCreated: '2022-02-09',
    dateUpdated: '2022-02-07',
    id: 2,
  },
  {
    title: 'Энциклопедия Говнолора 3',
    slug: 'encyclopedia_govnolor_3',
    category: 'Мир',
    linkedArticles: '2',
    dateCreated: '2022-02-19',
    dateUpdated: '2022-02-07',
    id: 3,
  },
];

export const articlesColumns = [
  {
    title: 'Title',
    key: 'title',
  },
  {
    title: 'Slug',
    key: 'slug',
  },
  {
    title: 'Category',
    key: 'category',
  },
  {
    title: 'Links',
    key: 'linkedArticles',
  },
  {
    title: 'Created',
    key: 'dateCreated',
  },
  {
    title: 'Updated',
    key: 'dateUpdated',
  },
];
