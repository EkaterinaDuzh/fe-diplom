export interface ITown {
  _id: string;
  name: string;
}

export interface ISearchParams {
  from_city_id: string;
  to_city_id: string;

  date_start: string;
  date_end: string;

  minPrice?: number;
  maxPrice?: number;

  startDepartureHourFrom?: number;
  startDepartureHourTo?: number;

  endDepartureHourFrom?: number;
  endDepartureHourTo?: number;

  startArrivalHourFrom?: number;
  startArrivalHourTo?: number;

  endArrivalHourFrom?: number;
  endArrivalHourTo?: number;

  firstClass?: boolean;
  secondClass?: boolean;
  thirdClass?: boolean;
  fourthClass?: boolean;

  wifi?: boolean;
  express?: boolean;
}

export interface ITrain {
  arrival?: {
    _id: string;

    available_seats: number;
    available_seats_info: {
      first?: number;
      second?: number;
      third?: number;
      fourth?: number;
    };

    duration: number;

    have_first_class: boolean;
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
    have_wifi: boolean;
    have_air_conditioning: boolean;

    is_express: boolean;

    min_price: number;

    price_info: {
      first?: {
        price?: number;
        top_price?: number;
        bottom_price?: number;
      };
      second?: {
        top_price?: number;
        bottom_price?: number;
      };
      third?: {
        top_price?: number;
        bottom_price?: number;
        side_price?: number;
      };
      fourth?: {
        top_price?: number;
        bottom_price?: number;
      };
    };

    from: {
      railway_station_name: string;
      city: {
        _id: string;
        name: string;
      };
      datetime: number;
    };

    to: {
      railway_station_name: string;
      city: {
        _id: string;
        name: string;
      };
      datetime: number;
    };

    train: {
      _id: string;
      name: string;
    };
  };

  available_seats: number;

  available_seats_info: {
    first?: number;
    second?: number;
    third?: number;
    fourth?: number;
  };

  departure: {
    _id: string;

    available_seats: number;
    available_seats_info: {
      first?: number;
      second?: number;
      third?: number;
      fourth?: number;
    };

    duration: number;

    have_first_class: boolean;
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
    have_wifi: boolean;
    have_air_conditioning: boolean;

    is_express: boolean;

    min_price: number;

    price_info: {
      first?: {
        price?: number;
        top_price?: number;
        bottom_price?: number;
      };
      second?: {
        top_price?: number;
        bottom_price?: number;
      };
      third?: {
        top_price?: number;
        bottom_price?: number;
        side_price?: number;
      };
      fourth?: {
        top_price?: number;
        bottom_price?: number;
      };
    };

    from: {
      railway_station_name: string;
      city: {
        _id: string;
        name: string;
      };
      datetime: number;
    };

    to: {
      railway_station_name: string;
      city: {
        _id: string;
        name: string;
      };
      datetime: number;
    };

    train: {
      _id: string;
      name: string;
    };
  };

  have_air_conditioning: boolean;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;

  is_express: boolean;

  min_price: number;
}

export interface ICarriage {
  coach: {
    _id: string;
    carriage_number: number;
    top: number;
    bottom: number;
    side: number;
    name: string;
    class_type: string;
    have_wifi: true;
    have_air_conditioning: false;
    price: number;
    top_price: number;
    bottom_price: number;
    side_price: number;
    linens_price: number;
    wifi_price: number;
    is_linens_included: true;
    available_seats: number;
    train: string;
  };
  seats: { index: number; available: boolean; isActive: boolean }[];
}

export interface IMyCarriageProps {
  isForward: boolean;
  _id: string;
  adults: { count: number; isActive: boolean };
  children: { count: number; isActive: boolean };
  baby: { count: number; isActive: boolean };
  currentSeats: { index: number; available: boolean; isActive: boolean }[];
  carriage_number: number;
  price: number;
  top_price: number;
  bottom_price: number;
  side_price: number;
  have_wifi: boolean;
  wiFiPrice: number;
  is_linens_included: boolean;
  linensPrice: number;
  onSeatClick: (seatIndex: number, price: number, isChecked: boolean) => void;
}

export interface IOrder {
  coach_id: string;
  seat_number: number;

  is_adult: boolean;
  is_child: boolean;
  is_baby: boolean;

  total_price: number;
}

export interface IPassenger {
  type: string;
  lastName: { value: string; isValid: boolean; hasError: boolean };
  firstName: { value: string; isValid: boolean; hasError: boolean };
  middleName: { value: string; isValid: boolean; hasError: boolean };
  gender: boolean;
  birthdate: { value: string; isValid: boolean; hasError: boolean };
  limitedMobility: boolean;
  document: string;
  passportSeries: { value: string; isValid: boolean; hasError: boolean };
  passportNumber: { value: string; isValid: boolean; hasError: boolean };
  certificateNumber: { value: string; isValid: boolean; hasError: boolean };
}