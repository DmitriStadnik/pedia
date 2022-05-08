import { Button, FormGroup, H4, Spinner } from '@blueprintjs/core';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { Fragment, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Category } from '../../../utils/dto/category';
import { categoryApi } from '../../../utils/store/api/category';
import { translitRus } from '../../../utils/utils';

const newCategory: Category = {
  slug: '',
  title: '',
  _id: 'new',
};

export const EditCategory: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateCategory] = categoryApi.useUpdateMutation();
  const [createCategory] = categoryApi.useCreateMutation();

  const {
    data: categories,
    isLoading: categoriesLoading,
  } = categoryApi.useGetListQuery();

  const category = categories?.find((item) => item._id === id);

  const validateForm = (values: Category) => {
    const errors: Record<string, any> = {};

    if (!values.title) {
      errors.title = 'Must not be empty';
    }

    if (!values.slug) {
      errors.slug = 'Must not be empty';
    }

    return errors;
  };

  const handleBackClick = () => {
    navigate('/admin');
  };

  const handleSubmit = async (
    values: Category,
    { setSubmitting }: FormikHelpers<Category>
  ) => {
    try {
      if (id === 'new') {
        await createCategory(values).unwrap();
      } else {
        await updateCategory(values).unwrap();
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

  const getCategory = useMemo(() => {
    return category || newCategory;
  }, [category]);

  if (!id) {
    return <Fragment />;
  }

  if (categoriesLoading) {
    return <Spinner />;
  }

  return (
    <div className="edit">
      <H4>
        <Button minimal onClick={handleBackClick} icon="arrow-left" />
        {id === 'new'
          ? 'Create new article'
          : `Edit article #${getCategory._id}`}
      </H4>
      <Formik
        initialValues={{ ...getCategory }}
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <FormGroup label="Title" labelFor="title">
              <Field id="title" name="title" className="edit__form__field" />
              {errors.title && touched.title ? (
                <p className="edit__form__error">{errors.title}</p>
              ) : null}
            </FormGroup>
            <FormGroup label="Slug" labelFor="slug">
              <Field id="slug" name="slug" className="edit__form__field" />
              <Button
                type="button"
                onClick={() => setFieldValue('slug', translitRus(values.title))}
              >
                Generate slug
              </Button>
              {errors.slug && touched.slug ? (
                <p className="edit__form__error">{errors.slug}</p>
              ) : null}
            </FormGroup>
            <Button type="submit" text="Submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
};
