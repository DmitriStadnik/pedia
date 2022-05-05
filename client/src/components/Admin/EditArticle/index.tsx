import React, { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { articleApi } from '../../../utils/store/api/article';

export const EditArticle: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <Fragment />;
  }

  const navigate = useNavigate();

  const { article } = articleApi.useGetListQuery(undefined, {
    selectFromResult: ({ data }) => ({
      article: data?.find((item) => item._id === id),
    }),
  });

  if (!article) {
    console.log('no article');
    return <Fragment />;
  }

  const handleBackClick = () => {
    navigate('/admin');
  };

  return (
    <div className="edit">
      <button onClick={handleBackClick}>back</button>
      {article._id}
      {article.title}
    </div>
  );
};