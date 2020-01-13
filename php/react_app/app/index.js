import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const CONTAINER = styled.div`
  background: #f7f9fa;
  height: auto;
  width: 90%;
  margin: 5em auto;
  color: snow;
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);

  @media (min-width: 786px) {
    width: 60%;
  }

  label {
    color: #24b9b6;
    font-size: 1.2em;
    font-weight: 400;
  }

  h1 {
    color: #24b9b6;
    padding-top: 0.5em;
  }

  .form-group {
    margin-bottom: 2.5em;
  }

  .error {
    border: 2px solid #ff6565;
  }

  .error-message {
    color: #ff6565;
    padding: 0.5em 0.2em;
    height: 1em;
    position: absolute;
    font-size: 0.8em;
  }
`;

const MYFORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;

  @media (min-width: 786px) {
    width: 50%;
  }
`;

const BUTTON = styled(Button)`
  background: #1863ab;
  border: none;
  font-size: 1.2em;
  font-weight: 400;

  &:hover {
    background: #1d3461;
  }
`;

// RegEx for DOB validation
const DOBRegExp = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

// Schema for yup
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, '*Names must have at least 2 characters')
    .max(100, "*Names can't be longer than 100 characters")
    .required('*Name is required'),
  DOB: Yup.string()
    .matches(DOBRegExp, '*Data of Birth is not in mm/dd/yyyy format')
    .required('*Data of Birth is required'),
  email: Yup.string()
    .email('*Must be a valid email address')
    .min(5, '*Email must have at least 5 characters')
    .max(100, '*Email must be less than 100 characters')
    .required('*Email is required'),
  color: Yup.string().max(20, "*Color can't be longer than 20 characters"),
});

const App = () => (
  <CONTAINER>
    <Formik
      initialValues={{ name: '', email: '', color: '', DOB: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // When button submits form and form is in the process of submitting, submit button is disabled
        setSubmitting(true);
        const { name, DOB, email, color } = values;
        const params = new URLSearchParams();
        params.append('name', name);
        params.append('DOB', DOB);
        params.append('email', email);
        params.append('color', color);
        axios
          .post(`http://127.0.0.1:8000/index.php/api/saveUser`, params)
          .then(res => {
            console.log(res);
            if (res.data.error) {
              alert(res.data.email);
              setSubmitting(false);
            } else {
              resetForm();
              setSubmitting(false);
              alert('Saved!');
            }
          });
      }}
    >
      {/* Callback function containing Formik state and helpers that handle common form actions */}
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <MYFORM onSubmit={handleSubmit} className="mx-auto">
          <Form.Group controlId="formName">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              /* This name property is used to access the value of the form element via values.nameOfElement */
              name="name"
              placeholder="Full Name"
              /* Set onChange to handleChange */
              onChange={handleChange}
              /* Set onBlur to handleBlur */
              onBlur={handleBlur}
              /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
              value={values.name}
              /* Check if the name field (this field) has been touched and if there is an error, if so add the .error class styles defined in the CSS (make the input box red) */
              className={touched.name && errors.name ? 'error' : null}
            />
            {/* Applies the proper error message from validateSchema when the user has clicked the element and there is an error, also applies the .error-message CSS class for styling */}
            {touched.name && errors.name ? (
              <div className="error-message">{errors.name}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="formDOB">
            <Form.Label>Date of Birth :</Form.Label>
            <Form.Control
              type="text"
              name="DOB"
              placeholder="mm/dd/yyyy"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.DOB}
              className={touched.DOB && errors.DOB ? 'error' : null}
            />
            {touched.DOB && errors.DOB ? (
              <div className="error-message">{errors.DOB}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={touched.email && errors.email ? 'error' : null}
            />
            {touched.email && errors.email ? (
              <div className="error-message">{errors.email}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="formColor">
            <Form.Label>Favorite Color :</Form.Label>
            <Form.Control
              type="text"
              name="color"
              placeholder="Yellow"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.color}
              className={touched.color && errors.color ? 'error' : null}
            />
            {touched.color && errors.color ? (
              <div className="error-message">{errors.color}</div>
            ) : null}
          </Form.Group>
          <BUTTON variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </BUTTON>
        </MYFORM>
      )}
    </Formik>
  </CONTAINER>
);

ReactDOM.render(<App madeBy="nico" />, document.getElementById('app'));
