// src/App.jsx
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>React Form Handling Demo</h1>
      <div className="forms-container">
        <RegistrationForm />
        <FormikForm />
      </div>
    </div>
  );
}

export default App;