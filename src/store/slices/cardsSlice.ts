import { createSlice } from '@reduxjs/toolkit';
import { CardData } from '../../api/types';

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    detailedCard: {} as CardData,
    cardsList: [] as CardData[],
  },
  reducers: {
    setCards(state, action) {
      state.cardsList = action.payload;
    },
    setDetailedCard(state, action) {
      state.detailedCard = action.payload;
    },
  },
});

export const { setCards, setDetailedCard } = cardsSlice.actions;

export default cardsSlice.reducer;
