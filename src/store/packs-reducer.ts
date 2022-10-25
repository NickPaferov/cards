import {
  packsApi,
  PacksQueryParamsType,
  PacksResponseType,
  PackType,
} from "../api/packs-api";
import { AppThunk, InferActionTypes } from "./store";
import { appActions } from "./app-reducer";
import { handleApiError } from "../utils/handle-api-error";

const initialState = {
  packs: {
    cardPacks: [] as PackType[],
  } as PacksResponseType,
  queryParams: {
    packName: "",
    page: 1,
    pageCount: 10,
    user_id: "",
  } as PacksQueryParamsType,
};

type PacksStateType = typeof initialState;

export const packsReducer = (
  state: PacksStateType = initialState,
  action: PacksActionType
): PacksStateType => {
  switch (action.type) {
    case "PACKS/SET-PACKS":
      return { ...state, packs: action.payload.packs };
    case "PACKS/SET-PACK-NAME-FILTER":
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          packName: action.payload.packName,
        },
      };
    case "PACKS/SET-MY-PACKS-FILTER":
      return {
        ...state,
        queryParams: { ...state.queryParams, user_id: action.payload.userId },
      };
    case "PACKS/SET-RANGE-NUMBER-OF-CARDS":
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          min: action.payload.min,
          max: action.payload.max,
        },
      };
    case "PACKS/SET-SORT-PACKS":
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          sortPacks: action.payload.sortValue,
        },
      };
    case "PACKS/CLEAR-FILTERS":
      return {
        ...state,
        queryParams: { ...state.queryParams, ...action.payload },
      };
    case "PACKS/SET-CURRENT-PAGE":
      return {
        ...state,
        queryParams: { ...state.queryParams, page: action.payload.page },
      };
    default:
      return state;
  }
};

export const packsActions = {
  setPacks: (packs: PacksResponseType) => ({
    type: "PACKS/SET-PACKS" as const,
    payload: { packs },
  }),
  setPackNameFilter: (packName: string) => ({
    type: "PACKS/SET-PACK-NAME-FILTER" as const,
    payload: { packName },
  }),
  setMyPacksFilter: (userId: string) => ({
    type: "PACKS/SET-MY-PACKS-FILTER" as const,
    payload: { userId },
  }),
  setRangeNumberOfCards: (min: number, max: number) => ({
    type: "PACKS/SET-RANGE-NUMBER-OF-CARDS" as const,
    payload: { min, max },
  }),
  setSortPacks: (sortValue: string) => ({
    type: "PACKS/SET-SORT-PACKS" as const,
    payload: { sortValue },
  }),
  clearFilters: () => ({
    type: "PACKS/CLEAR-FILTERS" as const,
    payload: { packName: "", user_id: "", min: 0, max: 100 },
  }),
  setCurrentPage: (page: number) => ({
    type: "PACKS/SET-CURRENT-PAGE" as const,
    payload: { page },
  }),
};

export const packsThunks = {
  fetchPacks: (): AppThunk => async (dispatch, getState) => {
    dispatch(appActions.setIsLoading(true));
    try {
      const queryParams = getState().packs.queryParams;
      const packs = await packsApi.getPacks(queryParams);
      dispatch(packsActions.setPacks(packs));
    } catch (e) {
      handleApiError(e, dispatch);
    } finally {
      dispatch(appActions.setIsLoading(false));
    }
  },
  addPack: (): AppThunk => async (dispatch) => {
    dispatch(appActions.setIsLoading(true));
    try {
      await packsApi.createPack({ name: "new pack" });
      dispatch(packsThunks.fetchPacks());
      dispatch(appActions.setSnackbarMessage("Pack added"));
    } catch (e) {
      handleApiError(e, dispatch);
    } finally {
      dispatch(appActions.setIsLoading(false));
    }
  },
  deletePack:
    (packId: string): AppThunk =>
    async (dispatch) => {
      dispatch(appActions.setIsLoading(true));
      try {
        await packsApi.deletePack(packId);
        dispatch(packsThunks.fetchPacks());
        dispatch(appActions.setSnackbarMessage("Pack removed"));
      } catch (e) {
        handleApiError(e, dispatch);
      } finally {
        dispatch(appActions.setIsLoading(false));
      }
    },
  updatePackName:
    (packId: string): AppThunk =>
    async (dispatch) => {
      dispatch(appActions.setIsLoading(true));
      try {
        await packsApi.updatePack({ _id: packId, name: "updated pack" });
        dispatch(packsThunks.fetchPacks());
        dispatch(appActions.setSnackbarMessage("Pack's name changed"));
      } catch (e) {
        handleApiError(e, dispatch);
      } finally {
        dispatch(appActions.setIsLoading(false));
      }
    },
};

export type PacksActionType = InferActionTypes<typeof packsActions>;
