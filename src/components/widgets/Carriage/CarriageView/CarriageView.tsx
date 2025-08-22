import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import {
  setArrivalOrder,
  setArrivalCurrentTypeCarriagesList,
  setArrivalCopyCurrentTypeCarriagesList,
  setArrivalAdultsCount,
  setArrivalBabyCount,
  setArrivalChildrenCount,
} from '../../../../redux/arrivalSlice';
import {
  setDepartureOrder,
  setDepartureCurrentTypeCarriagesList,
  setDepartureCopyCurrentTypeCarriagesList,
  setDepartureAdultsCount,
  setDepartureChildrenCount,
  setDepartureBabyCount,
} from '../../../../redux/departureSlice';
import { RootState } from '../../../../redux/store';
import { ICarriage, IOrder } from '../../../../models/models';
import CarriageCompartment from '../CarriageCompartment/CarriageCompartment';
import CarriageLux from '../CarriageLux/CarriageLux';
import CarriagePlatzkart from '../CarriagePlatzkart/CarriagePlatzkart';
import CarriageSeat from '../CarriageSeat/CarriageSeat';

import './CarriageView.css';

const CarriageView = ({ isForward }: { isForward: boolean }) => {
  const dispatch: AppDispatch = useDispatch();

  const {
    adults,
    children,
    baby,
    currentCarriageType,
    currentTypeCarriagesList,
    currentCopyTypeCarriagesList,
    activeCarriageIndex,
    wiFiPrice,
    linensPrice,
    orderList,
  } = useSelector((state: RootState) =>
    isForward ? state.departure : state.arrival
  );

  const currentCarriage: ICarriage =
    currentTypeCarriagesList[activeCarriageIndex];

  const {
    _id,
    carriage_number,
    price,
    top_price,
    bottom_price,
    side_price,
    have_wifi,
    is_linens_included,
  } = currentCarriage.coach;

  const currentSeats: {
    index: number;
    available: boolean;
    isActive: boolean;
  }[] = currentCarriage.seats;

  const handleClick = (
    seatIndex: number,
    price: number,
    isChecked: boolean
  ) => {
    const orderOptions: IOrder = {
      coach_id: _id,
      seat_number: seatIndex,

      is_adult: adults.isActive,
      is_child: children.isActive,
      is_baby: baby.isActive,

      total_price: price,
    };

    const updatedOrderList = orderList.filter((el) => {
      if (el.coach_id !== _id || el.seat_number !== seatIndex) {
        return true;
      }

      if (baby.isActive && el.is_baby) {
        return false;
      }

      if (children.isActive && el.is_child) {
        return false;
      }
      if (adults.isActive && el.is_adult) {
        return false;
      }

      return true;
    });

    const finalOrderList = updatedOrderList.filter((el) => {
      if (el.is_baby && el.coach_id === _id && el.seat_number === seatIndex) {
        const wasAdultRemoved = !updatedOrderList.some(
          (order) =>
            order.coach_id === _id &&
            order.seat_number === seatIndex &&
            order.is_adult
        );
        return !wasAdultRemoved;
      }
      return true;
    });

    const newOrderList = isChecked
      ? finalOrderList
      : [...orderList, orderOptions];

    dispatch(
      isForward
        ? setDepartureOrder(newOrderList)
        : setArrivalOrder(newOrderList)
    );

    const newCopyList = currentCopyTypeCarriagesList.map((item, index) =>
      index === activeCarriageIndex
        ? {
            ...item,
            seats: item.seats.map((seat) =>
              seat.index === seatIndex
                ? {
                    ...seat,
                    available: seat.isActive,
                    isActive: !seat.isActive,
                  }
                : seat
            ),
          }
        : item
    );

    dispatch(
      isForward
        ? setDepartureCopyCurrentTypeCarriagesList(newCopyList)
        : setArrivalCopyCurrentTypeCarriagesList(newCopyList)
    );

    const isMaxSeatsSelected = newOrderList.length > 3;

    const newList = newCopyList.map((item) => ({
      ...item,
      seats: item.seats.map((seat) => ({
        ...seat,
        available: isMaxSeatsSelected ? false : seat.available,
      })),
    }));

    dispatch(
      isForward
        ? setDepartureCurrentTypeCarriagesList(newList)
        : setArrivalCurrentTypeCarriagesList(newList)
    );

    const adultsCount = newOrderList.filter((order) => order.is_adult).length;
    const childrenCount = newOrderList.filter((order) => order.is_child).length;
    const babyCount = newOrderList.filter((order) => order.is_baby).length;

    if (isForward) {
      dispatch(setDepartureAdultsCount(adultsCount));
      dispatch(setDepartureChildrenCount(childrenCount));
      dispatch(setDepartureBabyCount(babyCount));
    } else {
      dispatch(setArrivalAdultsCount(adultsCount));
      dispatch(setArrivalChildrenCount(childrenCount));
      dispatch(setArrivalBabyCount(babyCount));
    }
  };

  const data = {
    isForward,
    _id,
    adults,
    children,
    baby,
    carriage_number,
    currentSeats,
    price,
    top_price,
    bottom_price,
    side_price,
    have_wifi,
    wiFiPrice,
    is_linens_included,
    linensPrice,
    onSeatClick: (seatIndex: number, price: number, isChecked: boolean) =>
      handleClick(seatIndex, price, isChecked),
  };

  return (
    <>
      {currentCarriageType && (
        <div className="carriage-view">
          {currentCarriageType === 'fourth' && <CarriageSeat data={data} />}
          {currentCarriageType === 'third' && <CarriagePlatzkart data={data} />}
          {currentCarriageType === 'second' && (
            <CarriageCompartment data={data} />
          )}
          {currentCarriageType === 'first' && <CarriageLux data={data} />}
        </div>
      )}
    </>
  );
};

export default CarriageView;