import { AppThunk, InferActionTypes } from "./store";
import { appActions } from "./app-reducer";
import { handleApiError } from "../utils/handle-api-error";
import {
  cardsApi,
  CardsQueryParamsType,
  CardsResponseType,
  CardType,
} from "../api/cards-api";

const initialState = {
  cardsState: {
    cards: [] as CardType[],
  } as CardsResponseType,
  queryParams: {
    cardQuestion: "",
    page: 1,
    pageCount: 10,
  } as CardsQueryParamsType,
};

type CardsStateType = typeof initialState;

export const cardsReducer = (
  state: CardsStateType = initialState,
  action: CardsActionType
): CardsStateType => {
  switch (action.type) {
    case "CARDS/SET-CARDS":
      return { ...state, cardsState: action.payload.cards };
    case "CARDS/SET-CARD-NAME-FILTER":
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          cardQuestion: action.payload.cardName,
        },
      };
    case "CARDS/SET-SORT-CARDS":
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          sortCards: action.payload.sortValue,
        },
      };
    case "CARDS/SET-CURRENT-PAGE":
      return {
        ...state,
        queryParams: { ...state.queryParams, page: action.payload.page },
      };
    case "CARDS/RESET-CARDS-STATE":
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export const cardsActions = {
  setCards: (cards: CardsResponseType) => ({
    type: "CARDS/SET-CARDS" as const,
    payload: { cards },
  }),
  setCurrentPage: (page: number) => ({
    type: "CARDS/SET-CURRENT-PAGE" as const,
    payload: { page },
  }),
  setCardNameFilter: (cardName: string) => ({
    type: "CARDS/SET-CARD-NAME-FILTER" as const,
    payload: { cardName },
  }),
  setSortCards: (sortValue: string) => ({
    type: "CARDS/SET-SORT-CARDS" as const,
    payload: { sortValue },
  }),
  resetCardsState: () => ({ type: "CARDS/RESET-CARDS-STATE" } as const),
};

export const curdsThunks = {
  fetchCards:
    (packId: string): AppThunk =>
    async (dispatch, getState) => {
      dispatch(appActions.setIsLoading(true));
      try {
        const queryParams = getState().cards.queryParams;
        const cards = await cardsApi.getCards(packId, queryParams);
        dispatch(cardsActions.setCards(cards));
      } catch (e) {
        handleApiError(e, dispatch);
      } finally {
        dispatch(appActions.setIsLoading(false));
      }
    },
  addCard:
    (packId: string): AppThunk =>
    async (dispatch) => {
      dispatch(appActions.setIsLoading(true));
      try {
        await cardsApi.createCard({
          cardsPack_id: packId,
          question: "new question",
          answer: "new answer",
        });
        dispatch(curdsThunks.fetchCards(packId));
        dispatch(appActions.setSnackbarMessage("Card added"));
      } catch (e) {
        handleApiError(e, dispatch);
      } finally {
        dispatch(appActions.setIsLoading(false));
      }
    },
  removeCard:
    (packId: string, cardId: string): AppThunk =>
    async (dispatch) => {
      dispatch(appActions.setIsLoading(true));
      try {
        await cardsApi.deleteCard(cardId);
        dispatch(curdsThunks.fetchCards(packId));
        dispatch(appActions.setSnackbarMessage("Card removed"));
      } catch (e) {
        handleApiError(e, dispatch);
      } finally {
        dispatch(appActions.setIsLoading(false));
      }
    },
  updateCard:
    (packId: string, cardId: string): AppThunk =>
    async (dispatch) => {
      dispatch(appActions.setIsLoading(true));
      try {
        await cardsApi.updateCard({ _id: cardId, question: "new question " });
        dispatch(curdsThunks.fetchCards(packId));
        dispatch(appActions.setSnackbarMessage("Card updated"));
      } catch (e) {
        handleApiError(e, dispatch);
      } finally {
        dispatch(appActions.setIsLoading(false));
      }
    },
};

export type CardsActionType = InferActionTypes<typeof cardsActions>;
