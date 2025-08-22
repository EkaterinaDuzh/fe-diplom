import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useGetFinalData = () => {
  const {
    lastName: payerLastName,
    firstName: payerFirstName,
    middleName: payerMiddleName,
    phoneNumber,
    email,
    cash,
  } = useSelector((state: RootState) => state.payment);

  const {
    route_direction_id: departureRouteDirectionId,
    orderList: departureOrderList,
  } = useSelector((state: RootState) => state.departure);

  const {
    route_direction_id: arrivalRouteDirectionId,
    orderList: arrivalOrderList,
  } = useSelector((state: RootState) => state.arrival);

  const { passengersList } = useSelector(
    (state: RootState) => state.passengers
  );

  const user = {
    first_name: payerFirstName.value,
    last_name: payerLastName.value,
    patronymic: payerMiddleName.value,
    phone: '8' + phoneNumber.value.slice(2),
    email: email.value,
    payment_method: cash ? 'cash' : 'online',
  };

  const adultPassengersInfo = passengersList
    .filter((passenger) => passenger.data.type === 'Взрослый')
    .map((passenger) => {
      const {
        lastName,
        firstName,
        middleName,
        gender,
        birthdate,
        passportSeries,
        passportNumber,
      } = passenger.data;

      return {
        is_adult: true,
        first_name: firstName.value,
        last_name: lastName.value,
        patronymic: middleName.value,
        gender,
        birthday: birthdate.value.split('.').reverse().join('-'),
        document_type: 'паспорт',
        document_data: `${passportSeries.value} ${passportNumber.value}`,
      };
    });

  const childrenPassengersInfo = passengersList
    .filter((passenger) => passenger.data.type === 'Детский')
    .map((passenger) => {
      const {
        lastName,
        firstName,
        middleName,
        gender,
        birthdate,
        certificateNumber,
      } = passenger.data;

      return {
        is_adult: false,
        first_name: firstName.value,
        last_name: lastName.value,
        patronymic: middleName.value,
        gender,
        birthday: birthdate.value.split('.').reverse().join('-'),
        document_type: 'свидетельство',
        document_data: certificateNumber.value,
      };
    });

  const departureAdultPassengersInfoCopy = [...adultPassengersInfo];
  const arrivalAdultPassengersInfoCopy = [...adultPassengersInfo];

  const departureChildrenPassengersInfoCopy = [...childrenPassengersInfo];
  const arrivalChildrenPassengersInfoCopy = [...childrenPassengersInfo];

  const departureNotBabySeats = departureOrderList.filter(
    (order) => !order.is_baby
  );

  const departureBabySeats = departureOrderList.filter(
    (order) => order.is_baby
  );

  const departureSeatsWithoutBabies = departureNotBabySeats.map((seat) => {
    return {
      coach_id: seat.coach_id,
      person_info: seat.is_adult
        ? departureAdultPassengersInfoCopy.pop()
        : departureChildrenPassengersInfoCopy.pop(),
      seat_number: seat.seat_number,
      is_child: seat.is_child,
      include_children_seat: false,
    };
  });

  const departureSeats = departureSeatsWithoutBabies.map((seat) => {
    if (seat.is_child === false) {
      departureBabySeats.forEach((babyseat) => {
        if (
          babyseat.coach_id === seat.coach_id &&
          babyseat.seat_number === seat.seat_number
        ) {
          seat.include_children_seat = true;
        }
      });
    }
    return seat;
  });

  const departure = {
    route_direction_id: departureRouteDirectionId,
    seats: departureSeats,
  };

  if (!arrivalRouteDirectionId) {
    return { user, departure };
  }

  const arrivalNotBabySeats = arrivalOrderList.filter(
    (order) => !order.is_baby
  );

  const arrivalBabySeats = arrivalOrderList.filter((order) => order.is_baby);

  const arrivalSeatsWithoutBabies = arrivalNotBabySeats.map((seat) => {
    return {
      coach_id: seat.coach_id,
      person_info: seat.is_adult
        ? arrivalAdultPassengersInfoCopy.pop()
        : arrivalChildrenPassengersInfoCopy.pop(),
      seat_number: seat.seat_number,
      is_child: seat.is_child,
      include_children_seat: false,
    };
  });

  const arrivalSeats = arrivalSeatsWithoutBabies.map((seat) => {
    if (seat.is_child === false) {
      arrivalBabySeats.forEach((babyseat) => {
        if (
          babyseat.coach_id === seat.coach_id &&
          babyseat.seat_number === seat.seat_number
        ) {
          seat.include_children_seat = true;
        }
      });
    }
    return seat;
  });

  const arrival = {
    route_direction_id: arrivalRouteDirectionId,
    seats: arrivalSeats,
  };

  const result = { user, departure, arrival };

  return result;
};

export default useGetFinalData;