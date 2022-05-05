export type ArticleDTO = {
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
