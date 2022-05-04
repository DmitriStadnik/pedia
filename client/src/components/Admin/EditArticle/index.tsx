import { Spinner } from '@blueprintjs/core';
import React, { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { articleApi } from '../../../utils/store/api/article';

export const EditArticle: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <Fragment />;
  }

  const navigate = useNavigate();

  const { data: article, error, isLoading } = articleApi.useGetByIdQuery(id);

  if (error) {
    console.log(error);
  }

  const handleBackClick = () => {
    navigate('/admin');
  };

  return (
    <Fragment>
      {isLoading ? (
        <div className="admin__spinner_wrapper">
          <Spinner className="admin__spinner" />
        </div>
      ) : (
        <div className="edit">
          <button onClick={handleBackClick}>back</button>
          {article._id}
          {article.title}
        </div>
      )}
    </Fragment>
  );
};
