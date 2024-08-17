import { Link } from 'react-router-dom';
import { UncontrolledForm } from '../components/forms';

export const UncontrolledFormPage = () => {
  return (
    <>
      <h1 className="title">Form with Uncontrolled Component</h1>
      <UncontrolledForm />
      <hr className="main-page-hr" />
      <Link to="/">Back to Main Page</Link>
    </>
  );
};
