import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { ITrain } from '../models/models';

interface IInitialState {
  lastTickets: ITrain[];
  lastTicketsLoading: boolean;
}

const initialState: IInitialState = {
  lastTickets: [],
  lastTicketsLoading: false,
};

const createSliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const lastTicketsSlice = createSliceWithThunk({
  name: 'lastTickets',
  initialState,
  reducers: (creators) => ({
    resetLastTicketsSlice: creators.reducer((state) => {
      state.lastTickets = initialState.lastTickets;
      state.lastTicketsLoading = initialState.lastTicketsLoading;
    }),
    fetchLastTickets: creators.asyncThunk<ITrain[]>(
      async (_, { rejectWithValue }) => {
        try {
          const baseUrl = import.meta.env.VITE_BASE_URL;
          const route = '/routes/last';

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
          state.lastTicketsLoading = true;
        },
        fulfilled: (state, action) => {
          state.lastTickets = JSON.parse(JSON.stringify(action.payload))
            .reverse()
            .slice(0, 3);
        },
        rejected: (state) => {
          state.lastTickets = [];
        },
        settled: (state) => {
          state.lastTicketsLoading = false;
        },
      }
    ),
  }),
});

export const { resetLastTicketsSlice, fetchLastTickets } =
  lastTicketsSlice.actions;
export default lastTicketsSlice.reducer;