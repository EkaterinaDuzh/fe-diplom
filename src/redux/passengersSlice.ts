import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPassenger } from '../models/models';

interface IPassengersState {
  passengersList: {
    isOpen: boolean;
    isDataValid: boolean;
    data: IPassenger;
  }[];
  passenger: IPassenger;
}

const initialState: IPassengersState = {
  passengersList: [],
  passenger: {
    type: 'Взрослый',
    lastName: { value: '', isValid: false, hasError: false },
    firstName: { value: '', isValid: false, hasError: false },
    middleName: { value: '', isValid: false, hasError: false },
    gender: true,
    birthdate: { value: '', isValid: false, hasError: false },
    limitedMobility: false,
    document: 'Паспорт РФ',
    passportSeries: { value: '', isValid: false, hasError: false },
    passportNumber: { value: '', isValid: false, hasError: false },
    certificateNumber: { value: '', isValid: false, hasError: false },
  },
};

const passengersSlice = createSlice({
  name: 'passengers',
  initialState,
  reducers: {
    resetPassengersSlice: (state) => {
      state.passengersList = initialState.passengersList;
      state.passenger = initialState.passenger;
    },
    addPassengerToList: (state) => {
      state.passengersList.push({
        isOpen: true,
        isDataValid: false,
        data: initialState.passenger,
      });
    },
    removePassengerFromList: (state, action: PayloadAction<number>) => {
      state.passengersList.splice(action.payload, 1);
    },
    setPassengersList: (state, action: PayloadAction<number>) => {
      state.passengersList = Array.from(
        { length: action.payload },
        (_, index) => ({
          isOpen: index === 0,
          isDataValid: false,
          data: initialState.passenger,
        })
      );
    },
    setIsOpen: (
      state,
      action: PayloadAction<{ index: number; isOpen: boolean }>
    ) => {
      const { index, isOpen } = action.payload;
      state.passengersList[index].isOpen = isOpen;
    },
    setIsDataValid: (
      state,
      action: PayloadAction<{ index: number; isDataValid: boolean }>
    ) => {
      const { index, isDataValid } = action.payload;
      state.passengersList[index].isDataValid = isDataValid;
    },
    setType: (
      state,
      action: PayloadAction<{ index: number; type: string }>
    ) => {
      const { index, type } = action.payload;
      state.passengersList[index].data.type = type;
    },
    setLastName: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { index, value, isValid, hasError } = action.payload;
      state.passengersList[index].data.lastName = {
        value,
        isValid,
        hasError,
      };
    },
    setFirstName: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { index, value, isValid, hasError } = action.payload;
      state.passengersList[index].data.firstName = {
        value,
        isValid,
        hasError,
      };
    },
    setMiddleName: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { index, value, isValid, hasError } = action.payload;
      state.passengersList[index].data.middleName = {
        value,
        isValid,
        hasError,
      };
    },
    setGender: (
      state,
      action: PayloadAction<{ index: number; gender: boolean }>
    ) => {
      const { index, gender } = action.payload;
      state.passengersList[index].data.gender = gender;
    },
    setBirthdate: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { index, value, isValid, hasError } = action.payload;
      state.passengersList[index].data.birthdate = {
        value,
        isValid,
        hasError,
      };
    },
    setLimitedMobility: (
      state,
      action: PayloadAction<{ index: number; mobility: boolean }>
    ) => {
      const { index, mobility } = action.payload;
      state.passengersList[index].data.limitedMobility = mobility;
    },
    setDocument: (
      state,
      action: PayloadAction<{ index: number; document: string }>
    ) => {
      const { index, document } = action.payload;
      state.passengersList[index].data.document = document;
    },
    setPassportSeries: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { index, value, isValid, hasError } = action.payload;
      state.passengersList[index].data.passportSeries = {
        value,
        isValid,
        hasError,
      };
    },
    setPassportNumber: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { index, value, isValid, hasError } = action.payload;
      state.passengersList[index].data.passportNumber = {
        value,
        isValid,
        hasError,
      };
    },
    setCertificateNumber: (
      state,
      action: PayloadAction<{
        index: number;
        value: string;
        isValid: boolean;
        hasError: boolean;
      }>
    ) => {
      const { index, value, isValid, hasError } = action.payload;
      state.passengersList[index].data.certificateNumber = {
        value,
        isValid,
        hasError,
      };
    },
  },
});

export const {
  addPassengerToList,
  removePassengerFromList,
  resetPassengersSlice,
  setPassengersList,
  setIsOpen,
  setIsDataValid,
  setType,
  setLastName,
  setFirstName,
  setMiddleName,
  setGender,
  setBirthdate,
  setLimitedMobility,
  setDocument,
  setPassportSeries,
  setPassportNumber,
  setCertificateNumber,
} = passengersSlice.actions;

export default passengersSlice.reducer;