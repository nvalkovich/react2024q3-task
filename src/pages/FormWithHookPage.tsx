import { Link } from 'react-router-dom';
import { ControlledForm } from '../components/forms';

export const FormWithHookPage = () => {
  return (
    <>
      <h1 className="title">Form with React Hook Form</h1>
      <ControlledForm />
      <hr className="main-page-hr" />
      <Link to="/">Back to Main Page</Link>
    </>
  );
};
