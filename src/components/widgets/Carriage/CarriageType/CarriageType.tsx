import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import {
  setArrivalCurrentCarriageType,
  setArrivalCurrentTypeCarriagesList,
  setArrivalActiveCarriageIndex,
  setArrivalCopyCurrentTypeCarriagesList,
} from '../../../../redux/arrivalSlice';
import {
  setDepartureCurrentCarriageType,
  setDepartureCurrentTypeCarriagesList,
  setDepartureActiveCarriageIndex,
  setDepartureCopyCurrentTypeCarriagesList,
} from '../../../../redux/departureSlice';
import './CarriageType.css';

const CarriageType = ({ isForward }: { isForward: boolean }) => {
  const dispatch: AppDispatch = useDispatch();

  const { adults, baby, children, currentCarriageType, orderList } =
    useSelector((state: RootState) =>
      isForward ? state.departure : state.arrival
    );

  const { forwardCarriages, backwardCarriages } = useSelector(
    (state: RootState) => state.carriages
  );

  const carriageTypes = [
    { name: 'seat', text: 'Сидячий', type: 'fourth' },
    { name: 'platzkart', text: 'Плацкарт', type: 'third' },
    { name: 'compartment', text: 'Купе', type: 'second' },
    { name: 'lux', text: 'Люкс', type: 'first' },
  ];

  const handleChangeActiveItem = (index: number) => {
    const carriageType = carriageTypes[index].type;

    const matchedCarriagesList = (
      isForward ? forwardCarriages : backwardCarriages
    ).filter((carriage) => carriage.coach.class_type === carriageType);

    const newCopyList = matchedCarriagesList.map((carriage) => ({
      ...carriage,
      seats: carriage.seats.map((seat, idx) => {
        const isAdultSelected = orderList.some(
          (order) =>
            order.coach_id === carriage.coach._id &&
            order.seat_number === idx + 1 &&
            order.is_adult
        );

        const isChildrenSelected = orderList.some(
          (order) =>
            order.coach_id === carriage.coach._id &&
            order.seat_number === idx + 1 &&
            order.is_child
        );

        const isBabySelected = orderList.some(
          (order) =>
            order.coach_id === carriage.coach._id &&
            order.seat_number === idx + 1 &&
            order.is_baby
        );

        let available = seat.available;
        let isActive = seat.isActive;

        if (adults.isActive) {
          available = seat.available && !isChildrenSelected;
          isActive = isAdultSelected;
        } else if (children.isActive) {
          available = seat.available && !isAdultSelected && !isChildrenSelected;
          isActive = isChildrenSelected;
        } else if (baby.isActive) {
          available = isAdultSelected && !isBabySelected;
          isActive = isBabySelected;
        }

        return { ...seat, available, isActive };
      }),
    }));

    const isMaxSeatsSelected = orderList.length === 4;

    const newList = newCopyList.map((carriage) => ({
      ...carriage,
      seats: carriage.seats.map((seat) => {
        return {
          ...seat,
          available: isMaxSeatsSelected ? false : seat.available,
        };
      }),
    }));

    if (isForward) {
      dispatch(setDepartureCurrentCarriageType(carriageType));
      dispatch(setDepartureCopyCurrentTypeCarriagesList(newCopyList));
      dispatch(setDepartureCurrentTypeCarriagesList(newList));
      dispatch(setDepartureActiveCarriageIndex(0));
      return;
    }

    dispatch(setArrivalCurrentCarriageType(carriageType));
    dispatch(setArrivalCopyCurrentTypeCarriagesList(newCopyList));
    dispatch(setArrivalCurrentTypeCarriagesList(newList));
    dispatch(setArrivalActiveCarriageIndex(0));
  };

  return (
    <div className="carriage-type">
      <h4 className="carriage-type__title">Тип вагона</h4>

      <ul className="carriage-type__list">
        {carriageTypes.map((carriage, index) => (
          <li
            key={index}
            className={`carriage-type__item${
              currentCarriageType === carriage.type
                ? ' carriage-type__item_active'
                : ''
            }`}
            onClick={
              currentCarriageType === carriage.type
                ? undefined
                : () => handleChangeActiveItem(index)
            }
          >
            <span
              className={`carriage-type__icon carriage-type__icon_${carriage.name}`}
            ></span>
            <span>{carriage.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarriageType;