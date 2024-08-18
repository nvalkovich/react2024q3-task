import { TileData } from './types';
import './Tile.css';

type TileProps = {
  data: TileData;
  index: number;
};

export const Tile = ({ data, index }: TileProps) => {
  return (
    <div className="data-tile" id={index === 0 ? 'new' : 'old'}>
      <div className="data-tile__list">
        <p>Name: {data.name}</p>
        <p>Age: {data.age}</p>
        <p>Email: {data.email}</p>
        <p>Password: {data.password}</p>
        <p>Confirmed password: {data.password}</p>
        <p>Gender: {data.gender}</p>
        <p>Conditions accepted: {data.conditionsAccepted ? 'yes' : 'no'}</p>
        <img src={data.file} width={200}></img>
        <p>Country: {data.country}</p>
      </div>
    </div>
  );
};
