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
  const [createArticle] = articleApi.useCreateMutation();

  const {
    data: categories,
    isLoading: categoriesLoading,
  } = categoryApi.useGetListQuery();

  const {
    data: articles,
    isLoading: articlesLoading,
  } = articleApi.useGetListQuery();

  const article = articles?.find((item) => item._id === id);

  const validateForm = (values: Article) => {
    const errors: Record<string, any> = {};

    if (!values.title) {
      errors.title = 'Must not be empty';
    }

    if (!values.slug) {
      errors.slug = 'Must not be empty';
    }

    if (!values.category || values.category === '') {
      errors.category = 'Choose category';
    }

    if (!values.content) {
      errors.content = 'Must not be empty';
    }

    return errors;
  };

  const handleBackClick = () => {
    navigate('/admin');
  };

  const handleSubmit = async (
    values: Article,
    { setSubmitting }: FormikHelpers<Article>
  ) => {
    try {
      if (id === 'new') {
        await createArticle(values).unwrap();
      } else {
        await updateArticle(values).unwrap();
      }

      navigate('/admin');
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
      <Formik
        initialValues={{ ...getArticle }}
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        {({ errors, touched }) => (
          <Form>
            <FormGroup label="Title" labelFor="title">
              <Field id="title" name="title" className="edit__form__field" />
              {errors.title && touched.title ? (
                <p className="edit__form__error">{errors.title}</p>
              ) : null}
            </FormGroup>
            <FormGroup label="Slug" labelFor="slug">
              <Field id="slug" name="slug" className="edit__form__field" />
              {errors.slug && touched.slug ? (
                <p className="edit__form__error">{errors.slug}</p>
              ) : null}
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
                {errors.category && touched.category ? (
                  <p className="edit__form__error">{errors.category}</p>
                ) : null}
              </FormGroup>
            )}
            <FormGroup label="Content" labelFor="content">
              <TextEditor name="content" />
              {errors.content && touched.content ? (
                <p className="edit__form__error">{errors.content}</p>
              ) : null}
            </FormGroup>
            {articlesLoading || (
              <FormGroup label="LinkedArticles" labelFor="linkedArticles">
                <LinkedArticles
                  name="linkedArticles"
                  articles={articles || []}
                />
              </FormGroup>
            )}
            <Button type="submit" text="Submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
};
