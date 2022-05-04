import React, { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const EditArticle: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/admin');
  };

  return (
    <Fragment>
      <div className="edit">
        <button onClick={handleBackClick}>back</button>
        {params.id}
      </div>
    </Fragment>
  );
};
