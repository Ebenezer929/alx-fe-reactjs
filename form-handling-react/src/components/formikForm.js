// Alternative approach if the above doesn't work
// src/components/formikForm.js
import { useFormik } from 'formik';
import { Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormikForm = () => {
  // Create validation schema with the exact pattern
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        // Simulate API call
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        
        if (response.ok) {
          setStatus({ message: 'Registration successful!', isError: false });
          formik.resetForm();
        } else {
          setStatus({ message: 'Registration failed. Please try again.', isError: true });
        }
      } catch (error) {
        setStatus({ message: 'An error occurred. Please try again.', isError: true });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="form-container">
      <h2>User Registration (Formik)</h2>
      <form onSubmit={formik.handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <Field
            type="text"
            id="username"
            name="username"
            className={formik.touched.username && formik.errors.username ? 'error' : ''}
          />
          <ErrorMessage name="username" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Field
            type="email"
            id="email"
            name="email"
            className={formik.touched.email && formik.errors.email ? 'error' : ''}
          />
          <ErrorMessage name="email" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Field
            type="password"
            id="password"
            name="password"
            className={formik.touched.password && formik.errors.password ? 'error' : ''}
          />
          <ErrorMessage name="password" component="div" className="error-message" />
        </div>

        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Registering...' : 'Register'}
        </button>
        
        {formik.status && (
          <div className={formik.status.isError ? 'submit-message error' : 'submit-message'}>
            {formik.status.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default FormikForm;