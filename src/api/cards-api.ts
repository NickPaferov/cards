import { apiClient } from "./apiClient";

export const cardsApi = {
  getCards: async (packId: string, params: CardsQueryParamsType) => {
    const res = await apiClient.get<CardsResponseType>(
      `cards/card?cardsPack_id =${packId}`,
      { params }
    );
    return res.data;
  },
  createCard: async (card: CreateCardParamsType) => {
    const res = await apiClient.post("cards/card", { card });
    return res.data;
  },
  deleteCard: async (cardId: string) => {
    const res = await apiClient.delete(`cards/card?id=${cardId}`);
    return res.data;
  },
  updateCard: async (card: UpdateCardParamsType) => {
    const res = await apiClient.put("cards/card", { card });
    return res.data;
  },
};

export type CardsQueryParamsType = {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};

export type CardsResponseType = {
  cards: CardType[];
  packUserId: string;
  packName: string;
  packPrivate: boolean;
  packDeckCover: string;
  packCreated: string;
  packUpdated: string;
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
  token: string;
  tokenDeathTime: number;
};

export type CardType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: number;
  shots: number;
  questionImg: string;
  answerImg: string;
  answerVideo: string;
  questionVideo: string;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
};

export type CreateCardParamsType = {
  cardsPack_id: string;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};

export type UpdateCardParamsType = {
  _id: string;
  question?: string;
};
