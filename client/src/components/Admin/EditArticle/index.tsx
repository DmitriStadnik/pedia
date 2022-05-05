import { Button, FormGroup, H4 } from '@blueprintjs/core';
import React, { Fragment } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { articleApi } from '../../../utils/store/api/article';
import { ArticleDTO } from '../../../utils/dto/article';
import { categoryApi } from '../../../utils/store/api/category';
import { TextEditor } from '../TextEditor';

export const EditArticle: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: categories,
    isLoading: categoriesLoading,
  } = categoryApi.useGetListQuery();

  const { article } = articleApi.useGetListQuery(undefined, {
    selectFromResult: ({ data }) => ({
      article: data?.find((item) => item._id === id),
    }),
  });

  const handleBackClick = () => {
    navigate('/admin');
  };

  if (!id || !article) {
    return <Fragment />;
  }

  return (
    <div className="edit">
      <H4>
        <Button minimal onClick={handleBackClick} icon="arrow-left" />
        Edit article #{article._id}
      </H4>
      <Formik
        initialValues={{ ...article }}
        onSubmit={(
          values: ArticleDTO,
          { setSubmitting }: FormikHelpers<ArticleDTO>
        ) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
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
                {categories?.map((category) => (
                  <option key={category.slug} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </Field>
            </FormGroup>
          )}
          <FormGroup label="Content" labelFor="content">
            {/* <Field id="content" name="content" className="edit__form__field" /> */}
            <TextEditor name="content" />
          </FormGroup>

          {/* <label htmlFor="lastName">Last Name</label>
         <Field id="lastName" name="lastName" placeholder="Doe" />

         <label htmlFor="email">Email</label>
         <Field
           id="email"
           name="email"
           placeholder="john@acme.com"
           type="email"
         /> */}

          <Button type="submit" text="Submit" />
        </Form>
      </Formik>
    </div>
  );
};
