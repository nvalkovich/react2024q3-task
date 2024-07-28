import { useEffect, useState } from 'react';
import './CardSelect.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CardData } from '../../api/types';
import {
  addSelectedCard,
  removeSelectedCard,
} from '../../store/slices/cardsSlice';

export function CardSelect(data: { currentCard: CardData }) {
  const dispatch = useAppDispatch();

  const selectedCards = useAppSelector((state) => state.cards.selectedCards);
  const isSelected = selectedCards?.some(
    (card) => card.id === data.currentCard.id
  );

  const [checked, setChecked] = useState<boolean>(isSelected);

  useEffect(() => {
    setChecked(isSelected);
  }, [selectedCards]);

  const onEmptyClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    dispatch(addSelectedCard(data.currentCard));
    setChecked(true);
  };

  const onCheckedClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    dispatch(removeSelectedCard(data.currentCard));
    setChecked(false);
  };

  return (
    <>
      {checked ? (
        <img
          className="checkbox-checked"
          src="./svg/checkbox-checked.svg"
          onClick={onCheckedClick}
          alt="checkbox"
        />
      ) : (
        <img
          className="checkbox-empty"
          src="./svg/empty-checkbox.svg"
          onClick={onEmptyClick}
          alt="checkbox"
        />
      )}
    </>
  );
}
