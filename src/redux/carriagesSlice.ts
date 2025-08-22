import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import transformCarriagesPayload from '../libs/transformCarriagesPayload';
import { ICarriage } from '../models/models';

interface IInitialState {
  forwardCarriages: ICarriage[];
  forwardCarriagesLoading: boolean;

  backwardCarriages: ICarriage[];
  backwardCarriagesLoading: boolean;
}

const initialState: IInitialState = {
  forwardCarriages: [],
  forwardCarriagesLoading: false,

  backwardCarriages: [],
  backwardCarriagesLoading: false,
};

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const carriagesSlice = createSliceWithThunk({
  name: 'carriages',
  initialState,
  reducers: (creators) => ({
    resetCarriagesSlice: creators.reducer((state) => {
      state.forwardCarriages = initialState.forwardCarriages;
      state.forwardCarriagesLoading = initialState.forwardCarriagesLoading;
      state.backwardCarriages = initialState.backwardCarriages;
      state.backwardCarriagesLoading = initialState.backwardCarriagesLoading;
    }),
    fetchForwardCarriages: creators.asyncThunk<ICarriage[], string>(
      async (id, { rejectWithValue }) => {
        try {
          const baseUrl = import.meta.env.VITE_BASE_URL;
          const route = `/routes/${id}/seats`;

          const request = baseUrl + route;

          const response = await fetch(request);

          if (!response.ok) {
            return rejectWithValue('Ошибка при получении данных от сервера...');
          }

          return await response.json();
        } catch (err) {
          return rejectWithValue(err);
        }
      },
      {
        pending: (state) => {
          state.forwardCarriagesLoading = true;
        },
        fulfilled: (state, { payload }) => {
          const transformedPayload = transformCarriagesPayload(payload);
          state.forwardCarriages = transformedPayload;
        },
        rejected: (state) => {
          state.forwardCarriages = [];
        },
        settled: (state) => {
          state.forwardCarriagesLoading = false;
        },
      }
    ),
    fetchBackwardCarriages: creators.asyncThunk<ICarriage[], string>(
      async (id, { rejectWithValue }) => {
        try {
          const baseUrl = import.meta.env.VITE_BASE_URL;
          const route = `/routes/${id}/seats`;

          const request = baseUrl + route;

          const response = await fetch(request);

          if (!response.ok) {
            return rejectWithValue('Ошибка при получении данных от сервера...');
          }

          return await response.json();
        } catch (err) {
          return rejectWithValue(err);
        }
      },
      {
        pending: (state) => {
          state.backwardCarriagesLoading = true;
        },
        fulfilled: (state, { payload }) => {
          const transformedPayload = transformCarriagesPayload(payload);
          state.backwardCarriages = transformedPayload;
        },
        rejected: (state) => {
          state.backwardCarriages = [];
        },
        settled: (state) => {
          state.backwardCarriagesLoading = false;
        },
      }
    ),
  }),
});

export const {
  fetchForwardCarriages,
  fetchBackwardCarriages,
  resetCarriagesSlice,
} = carriagesSlice.actions;

export default carriagesSlice.reducer;