import { Tile } from '../Tile/Tile';
import './DataTiles.css';

export interface TileData {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  conditionsAccepted: string;
  file: string;
  country: string;
}

type DataTilesProps = {
  data: TileData[];
};

export const DataTiles = ({ data }: DataTilesProps) => {
  const reversedData = [...data].reverse();

  return (
    <>
      {reversedData.map((dataItem, index) => 
            <Tile key={dataItem.id} data={dataItem} index={index} /> )}
    </>
  );
};
