import React, { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryApi } from '../../../utils/store/api/category';

export const EditCategory: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <Fragment />;
  }

  const navigate = useNavigate();

  const { category } = categoryApi.useGetListQuery(undefined, {
    selectFromResult: ({ data }) => ({
      category: data?.find((item) => item._id === id),
    }),
  });

  if (!category) {
    console.log('no category');
    return <Fragment />;
  }

  const handleBackClick = () => {
    navigate('/admin');
  };

  return (
    <div className="edit">
      <button onClick={handleBackClick}>back</button>
      {category._id}
      {category.title}
    </div>
  );
};
