import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICarriage, IOrder } from '../models/models';

interface IDepartureState {
  route_direction_id: string;

  adults: {
    count: number;
    isActive: boolean;
  };

  children: {
    count: number;
    isActive: boolean;
  };

  baby: {
    count: number;
    isActive: boolean;
  };

  currentCarriageType: string;
  currentTypeCarriagesList: ICarriage[];
  currentCopyTypeCarriagesList: ICarriage[];
  activeCarriageIndex: number;

  wiFiPrice: number;
  linensPrice: number;

  orderList: IOrder[];
}

const initialState: IDepartureState = {
  route_direction_id: '',

  adults: {
    count: 0,
    isActive: true,
  },

  children: {
    count: 0,
    isActive: false,
  },

  baby: {
    count: 0,
    isActive: false,
  },

  currentCarriageType: '',
  currentTypeCarriagesList: [],
  currentCopyTypeCarriagesList: [],
  activeCarriageIndex: 0,

  wiFiPrice: 0,
  linensPrice: 0,

  orderList: [],
};

const departureSlice = createSlice({
  name: 'departure',
  initialState,
  reducers: {
    resetDepartureSlice: (state) => {
      state.route_direction_id = initialState.route_direction_id;
      state.adults = initialState.adults;
      state.children = initialState.children;
      state.baby = initialState.baby;
      state.currentCarriageType = initialState.currentCarriageType;
      state.currentTypeCarriagesList = initialState.currentTypeCarriagesList;
      state.currentCopyTypeCarriagesList =
        initialState.currentCopyTypeCarriagesList;
      state.activeCarriageIndex = initialState.activeCarriageIndex;
      state.wiFiPrice = initialState.wiFiPrice;
      state.linensPrice = initialState.linensPrice;
      state.orderList = initialState.orderList;
    },
    setDepartureRouteDestinationId: (state, action: PayloadAction<string>) => {
      state.route_direction_id = action.payload;
    },
    setDepartureAdultsCount: (state, action: PayloadAction<number>) => {
      state.adults.count = action.payload;
    },
    setDepartureChildrenCount: (state, action: PayloadAction<number>) => {
      state.children.count = action.payload;
    },
    setDepartureBabyCount: (state, action: PayloadAction<number>) => {
      state.baby.count = action.payload;
    },
    setDepartureActivePerson: (state, action: PayloadAction<number>) => {
      if (action.payload === 1) {
        state.adults.isActive = false;
        state.children.isActive = true;
        state.baby.isActive = false;
      } else if (action.payload === 2) {
        state.adults.isActive = false;
        state.children.isActive = false;
        state.baby.isActive = true;
      } else {
        state.adults.isActive = true;
        state.children.isActive = false;
        state.baby.isActive = false;
      }
    },
    setDepartureCurrentCarriageType: (state, action: PayloadAction<string>) => {
      state.currentCarriageType = action.payload;
    },
    setDepartureCurrentTypeCarriagesList: (
      state,
      action: PayloadAction<ICarriage[]>
    ) => {
      state.currentTypeCarriagesList = JSON.parse(
        JSON.stringify(action.payload)
      );
    },
    setDepartureCopyCurrentTypeCarriagesList: (
      state,
      action: PayloadAction<ICarriage[]>
    ) => {
      state.currentCopyTypeCarriagesList = JSON.parse(
        JSON.stringify(action.payload)
      );
    },
    setDepartureActiveCarriageIndex: (state, action: PayloadAction<number>) => {
      state.activeCarriageIndex = action.payload;
    },
    setDepartureWiFiPrice: (state, action: PayloadAction<number>) => {
      state.wiFiPrice = action.payload;
    },
    setDepartureLinensPrice: (state, action: PayloadAction<number>) => {
      state.linensPrice = action.payload;
    },
    setDepartureOrder: (state, action: PayloadAction<IOrder[]>) => {
      state.orderList = action.payload;
    },
  },
});

export const {
  resetDepartureSlice,
  setDepartureRouteDestinationId,
  setDepartureAdultsCount,
  setDepartureChildrenCount,
  setDepartureBabyCount,
  setDepartureActivePerson,
  setDepartureCurrentCarriageType,
  setDepartureCurrentTypeCarriagesList,
  setDepartureCopyCurrentTypeCarriagesList,
  setDepartureActiveCarriageIndex,
  setDepartureWiFiPrice,
  setDepartureLinensPrice,
  setDepartureOrder,
} = departureSlice.actions;

export default departureSlice.reducer;