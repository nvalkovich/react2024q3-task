import { useEffect, useState } from 'react';
import styles from '../styles/CardSelect.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { CardData } from '../types/interfaces';
import {
  addSelectedCard,
  removeSelectedCard,
} from '../store/slices/cardsSlice';
import Image from 'next/image';

export function CardSelect(data: { currentCard: CardData }) {
  const dispatch = useAppDispatch();

  const selectedCards = useAppSelector((state) => state.cards.selectedCards);
  const isSelected = selectedCards?.some(
    (card) => card.id === data.currentCard.id
  );

  const [checked, setChecked] = useState<boolean>(isSelected);

  useEffect(() => {
    setChecked(isSelected);
  }, [isSelected, selectedCards]);

  const onEmptyClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();

    dispatch(addSelectedCard(data.currentCard));
    setChecked(true);
  };

  const onCheckedClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();

    dispatch(removeSelectedCard(data.currentCard));
    setChecked(false);
  };

  return (
    <>
      {checked ? (
        <Image
          className={styles.checked}
          onClick={onCheckedClick}
          src="./svg/checkbox-checked.svg"
          alt="checkbox checked"
          width={35}
          height={35}
        />
      ) : (
        <Image
          className={styles.empty}
          src="./svg/empty-checkbox.svg"
          onClick={onEmptyClick}
          alt="checkbox empty"
          width={35}
          height={35}
        />
      )}
    </>
  );
}
