import { Tile } from '../Tile/Tile';
import { TileData } from '../Tile/types';

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
