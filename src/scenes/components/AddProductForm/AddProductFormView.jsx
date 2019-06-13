import React from 'react';
import T from 'prop-types';
import { Formik, Form, Field } from 'formik';
import s from './AddProductForm.module.scss';
import { Button } from '../../../atoms';
import { addProductSchema } from '../../../utils/validationSchemas';
import FormInput from '../FormInput/FormInput';

function AddProductForm({
  handleAddProduct,
  handleImageLoader,
  isImageLoading,
  isLoading,
}) {
  return (
    <div className={s.container}>
      <h2 className={s.title}>Add product</h2>
      <Formik
        validationSchema={addProductSchema}
        initialValues={{
          title: '',
          location: '',
          description: '',
          photos: [],
          price: '',
        }}
        onSubmit={(body) => {
          handleAddProduct(body);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={s.form}>
            <Field
              primaryClass="addProductInput"
              label="title"
              name="title"
              autoComplete="off"
              type="text"
              placeholder="For example: Iron man suit"
              component={FormInput}
            />
            <Field
              primaryClass="addProductInput"
              label="location"
              name="location"
              type="text"
              placeholder="For example: Los Angeles CA"
              component={FormInput}
            />
            <Field
              name="description"
              label="description"
              placeholder="For example: Iron man suit"
              primaryClass="addProductInput"
              component={FormInput}
            />
            <p className={s.label} htmlFor="photos">
              photos
            </p>
            <div className={s.fileInputWrap}>
              {isImageLoading ? (
                <div className={s.fileLoader}>Adding...</div>
              ) : (
                <>
                  <input
                    type="file"
                    onChange={async (event) => {
                      const imageUrl = await handleImageLoader(event);
                      setFieldValue('photos', values.photos.concat(imageUrl));
                    }}
                    id="photos"
                    accept="image/*"
                    multiple
                    className={s.fileInput}
                  />
                  <label htmlFor="photos" className={s.fileUploadButton} />
                  {values.photos.map((photo) => (
                    <img src={photo} key={photo} alt="" className={s.thumb} />
                  ))}
                </>
              )}
            </div>
            <Field
              label="price"
              name="price"
              type="text"
              primaryClass="addProductInput"
              component={FormInput}
            />
            <div className={s.btnWrap}>
              <Button
                disabled={isImageLoading}
                primaryClass="primary-btn"
                type="submit"
              >
                {isLoading ? 'Adding...' : 'Submit'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

AddProductForm.propTypes = {
  handleAddProduct: T.func.isRequired,
  isLoading: T.bool,
  handleImageLoader: T.func,
  isImageLoading: T.bool,
};

AddProductForm.defaultProps = {
  isLoading: false,
  handleImageLoader: false,
  isImageLoading: false,
};

export default AddProductForm;
