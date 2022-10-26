import { apiClient } from "./apiClient";

export const packsApi = {
  getPacks: async (params: PacksQueryParamsType) => {
    const res = await apiClient.get<PacksResponseType>("cards/pack", {
      params,
    });
    return res.data;
  },
  createPack: async (cardsPack: CreatePackParamsType) => {
    const res = await apiClient.post("cards/pack", { cardsPack });
    return res.data;
  },
  deletePack: async (packId: string) => {
    const res = await apiClient.delete(`cards/pack?id=${packId}`);
    return res.data;
  },
  updatePack: async (cardsPack: UpdatePackParamsType) => {
    const res = await apiClient.put("cards/pack", { cardsPack });
    return res.data;
  },
};

export type PacksQueryParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
  block?: boolean;
};

export type PacksResponseType = {
  cardPacks: PackType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};

export type PackType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
};

export type CreatePackParamsType = {
  name?: string;
  deckCover?: string;
  private?: boolean;
};

export type UpdatePackParamsType = {
  _id: string;
  name?: string;
};
