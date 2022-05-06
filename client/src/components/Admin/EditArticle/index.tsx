import { Button, FormGroup, H4, Spinner } from '@blueprintjs/core';
import React, { Fragment, useMemo } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { articleApi } from '../../../utils/store/api/article';
import { Article } from '../../../utils/dto/article';
import { categoryApi } from '../../../utils/store/api/category';
import { TextEditor } from '../TextEditor';
import { LinkedArticles } from '../LinkedArticles';
import { toast } from 'react-toastify';

const newArticle: Article = {
  category: '',
  content: '',
  createdAt: new Date(),
  isMainArticle: false,
  linkedArticles: [''],
  slug: '',
  title: '',
  updatedAt: new Date(),
  _id: 'new',
};

export const EditArticle: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateArticle] = articleApi.useUpdateMutation();

  const {
    data: categories,
    isLoading: categoriesLoading,
  } = categoryApi.useGetListQuery();

  const {
    data: articles,
    isLoading: articlesLoading,
  } = articleApi.useGetListQuery();

  const article = articles?.find((item) => item._id === id);

  const handleBackClick = () => {
    navigate('/admin');
  };

  const handleSubmit = async (
    values: Article,
    { setSubmitting }: FormikHelpers<Article>
  ) => {
    try {
      await updateArticle(values).unwrap();
    } catch (e) {
      toast('Error occured', {
        type: 'error',
      });
    } finally {
      setSubmitting(false);
      toast('Success', {
        type: 'success',
      });
    }
  };

  const getArticle = useMemo(() => {
    return article || newArticle;
  }, [article]);

  if (!id) {
    return <Fragment />;
  }

  if (categoriesLoading || articlesLoading) {
    return <Spinner />;
  }

  return (
    <div className="edit">
      <H4>
        <Button minimal onClick={handleBackClick} icon="arrow-left" />
        {id === 'new'
          ? 'Create new article'
          : `Edit article #${getArticle._id}`}
      </H4>
      <Formik initialValues={{ ...getArticle }} onSubmit={handleSubmit}>
        <Form>
          <FormGroup label="Title" labelFor="title">
            <Field id="title" name="title" className="edit__form__field" />
          </FormGroup>
          <FormGroup label="Slug" labelFor="slug">
            <Field id="slug" name="slug" className="edit__form__field" />
          </FormGroup>
          <FormGroup label="Main article" labelFor="isMainArticle">
            <Field id="isMainArticle" type="checkbox" name="isMainArticle" />
          </FormGroup>
          {categoriesLoading || (
            <FormGroup label="Category" labelFor="category">
              <Field
                id="category"
                name="category"
                as="select"
                className="edit__form__field"
              >
                {id === 'new' && <option disabled value=""></option>}
                {categories?.map((category) => (
                  <option key={category.slug} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </Field>
            </FormGroup>
          )}
          <FormGroup label="Content" labelFor="content">
            <TextEditor name="content" />
          </FormGroup>
          {articlesLoading || (
            <FormGroup label="LinkedArticles" labelFor="linkedArticles">
              <LinkedArticles name="linkedArticles" articles={articles || []} />
            </FormGroup>
          )}
          <Button type="submit" text="Submit" />
        </Form>
      </Formik>
    </div>
  );
};
