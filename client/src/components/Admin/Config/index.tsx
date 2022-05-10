import { Button, FormGroup, H4, Spinner } from '@blueprintjs/core';
import React, { useMemo } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { TextEditor } from '../TextEditor';
import { toast } from 'react-toastify';
import { configApi } from '../../../utils/store/api/config';
import { Config } from '../../../utils/dto/config';

export const ConfigPage: React.FC = () => {
  const navigate = useNavigate();

  const [updateConfig] = configApi.useUpdateMutation();

  const { data: config, isLoading: configLoading } = configApi.useGetQuery();

  const validateForm = (values: Config) => {
    const errors: Record<string, any> = {};

    if (!values.title) {
      errors.title = 'Must not be empty';
    }

    if (!values.mainPageContent) {
      errors.mainPageContent = 'Must not be empty';
    }

    return errors;
  };

  const handleBackClick = () => {
    navigate('/admin');
  };

  const getConfig = useMemo(() => {
    return config || { title: '', mainPageContent: '', _id: '' };
  }, [config]);

  const handleSubmit = async (
    values: Config,
    { setSubmitting }: FormikHelpers<Config>
  ) => {
    try {
      const { title, mainPageContent } = values;

      await updateConfig({ title, mainPageContent }).unwrap();

      toast('Success', {
        type: 'success',
      });

      navigate('/admin');
    } catch (e) {
      toast('Error occured', {
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (configLoading) {
    return <Spinner />;
  }

  return (
    <div className="edit">
      <H4>
        <Button minimal onClick={handleBackClick} icon="arrow-left" />
        Config
      </H4>
      <Formik
        initialValues={{ ...getConfig }}
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        {({ errors, touched }) => (
          <Form>
            <FormGroup label="PEDIA Title" labelFor="title">
              <Field id="title" name="title" className="edit__form__field" />
              {errors.title && touched.title ? (
                <p className="edit__form__error">{errors.title}</p>
              ) : null}
            </FormGroup>
            <FormGroup label="Main Page Content" labelFor="mainPageContent">
              <TextEditor name="mainPageContent" />
              {errors.mainPageContent && touched.mainPageContent ? (
                <p className="edit__form__error">{errors.mainPageContent}</p>
              ) : null}
            </FormGroup>

            <Button type="submit" text="Submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
};
