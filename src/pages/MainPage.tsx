import { Link, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { DataTiles } from '../components/DataTiles/DataTiles';

export const MainPage = () => {
  const dataList = useAppSelector((state) => state.form.dataList);

  return (
    <>
      <ul className="main-links">
        <li>
          <Link to="/uncontrolled-form">Form with Uncontrolled Component</Link>
        </li>
        <li>
          <Link to="/with-hook-form">Form with React Hook Form</Link>
        </li>
      </ul>
      <hr />
      <div className="data-tiles">
        {dataList && <DataTiles data={dataList} />}
      </div>
    </>
  );
};
