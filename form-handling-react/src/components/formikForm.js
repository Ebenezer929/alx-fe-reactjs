// src/components/formikForm.js
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormikForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
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
          <input
            type="text"
            id="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className={formik.touched.username && formik.errors.username ? 'error' : ''}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error-message">{formik.errors.username}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? 'error' : ''}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={formik.touched.password && formik.errors.password ? 'error' : ''}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
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