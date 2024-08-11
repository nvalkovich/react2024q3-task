import { createSlice } from '@reduxjs/toolkit';
import { CardData } from '../../api/types';

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    selectedCards: [] as CardData[],
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
    setSelectedCards(state, action) {
      state.selectedCards = action.payload;
    },
    addSelectedCard(state, action) {
      state.selectedCards?.push(action.payload);
    },
    removeSelectedCard(state, action) {
      state.selectedCards = state.selectedCards?.filter(
        (card) => card.id !== action.payload.id
      );
    },
  },
});

export const {
  setCards,
  setDetailedCard,
  setSelectedCards,
  addSelectedCard,
  removeSelectedCard,
} = cardsSlice.actions;

export default cardsSlice.reducer;
