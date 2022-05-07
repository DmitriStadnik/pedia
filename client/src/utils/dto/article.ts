export type Article = {
  category: string;
  content: string;
  createdAt: Date;
  isMainArticle: boolean;
  linkedArticles: string[];
  slug: string;
  title: string;
  updatedAt: Date;
  _id: string;
};

export type ArticleUpdateDTO = {
  category: string;
  content: string;
  isMainArticle: boolean;
  linkedArticles: string[];
  slug: string;
  title: string;
  _id: string;
};

export type ArticleCreateDTO = {
  category: string;
  content: string;
  isMainArticle: boolean;
  linkedArticles: string[];
  slug: string;
  title: string;
};
