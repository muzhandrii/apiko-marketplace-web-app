import React from 'react';
import { Formik, Field, Form } from 'formik';
import T from 'prop-types';
import { Header } from '../../components';
import { Button, Avatar } from '../../atoms';
import { FormInput } from '../components';
import s from './Profile.module.scss';

export default function Profile({ viewer }) {
  const { fullName, avatar, phone } = viewer;
  return (
    <>
      <Header />
      <div className={s.userBox}>
        <h2 className={s.title}>Edit Profile</h2>
        <Formik
          initialValues={{
            avatar: [{ avatar }],
            fullName: [fullName],
            phone: [phone],
          }}
          onSubmit={(body) => {}}
        >
          {() => (
            <Form className={s.form}>
              <div className={s.avatarBox}>
                <div className={s.avatarWrap}>
                  <Avatar profile={viewer} />
                </div>
                <label htmlFor="photos" className={s.fileUploadButton}>
                  Upgrade Photo
                  <input
                    type="file"
                    // onChange={async (event) => {
                    //   const imageUrl = await handleImageLoader(event);
                    //   setFieldValue('photos', values.photos.concat(imageUrl));
                    // }}
                    id="photos"
                    accept="image/*"
                    className={s.fileInput}
                  />
                </label>
              </div>

              <Field
                primaryClass="authInput"
                label="full name"
                autoComplete="off"
                name="fullName"
                type="text"
                component={FormInput}
              />
              <Field
                primaryClass="authInput"
                label="phone number"
                name="phone"
                type="text"
                autoComplete="off"
                component={FormInput}
              />
              <div className={s.buttonWrap}>
                <Button primaryClass="primary-btn">Save</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

Profile.propTypes = {
  viewer: T.object.isRequired,
};
