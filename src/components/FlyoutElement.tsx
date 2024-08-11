import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedCards } from '../store/slices/cardsSlice';
import styles from '../styles/FlyoutElement.module.css';

export function FlyoutElement() {
  const dispatch = useAppDispatch();
  const selectedCards = useAppSelector((state) => state.cards.selectedCards);

  if (!selectedCards.length) {
    return;
  }

  const selectedNum = selectedCards.length;

  const unselectAll = () => {
    dispatch(setSelectedCards([]));
  };

  const downloadCSV = () => {
    const cardsData = selectedCards.map((card) => ({
      id: card.id,
      name: card.name,
      level: card.level,
      rarity: card.rarity,
      supertype: card.supertype,
      subtypes: card.subtypes?.join(', '),
      hp: card.hp,
      flavorText: card.flavorText || 'Not specified',
    }));

    const keys = Object.keys(cardsData[0]) as (keyof (typeof cardsData)[0])[];

    const csvRows = [
      keys.join(','),
      ...cardsData.map((card) => keys.map((key) => card[key]).join(',')),
    ].join('\n');

    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    return URL.createObjectURL(blob);
  };

  return (
    <>
      <div className={styles.container}>
        <span>{selectedNum} items are selected</span>
        <div className={styles.btns}>
          <button
            className={styles.btn}
            onClick={unselectAll}
            data-testid="unselect_btn"
          >
            Unselect all
          </button>

          <button className={styles.btn}>
            <a
              download={`${selectedNum}_pokemons.csv`}
              href={downloadCSV()}
              data-testid="download_csv_btn"
            >
              Download
            </a>
          </button>
        </div>
      </div>
    </>
  );
}
