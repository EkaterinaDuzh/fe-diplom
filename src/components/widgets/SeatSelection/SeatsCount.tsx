import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import {
  setArrivalActivePerson,
  setArrivalCopyCurrentTypeCarriagesList,
  setArrivalCurrentTypeCarriagesList,
} from '../../../redux/arrivalSlice';
import {
  setDepartureActivePerson,
  setDepartureCopyCurrentTypeCarriagesList,
  setDepartureCurrentTypeCarriagesList,
} from '../../../redux/departureSlice';
import './SeatsCount.css';

const SeatsCount = ({ isForward }: { isForward: boolean }) => {
  const dispatch: AppDispatch = useDispatch();

  const { adults, baby, children, currentCarriageType, orderList } =
    useSelector((state: RootState) =>
      isForward ? state.departure : state.arrival
    );

  const { forwardCarriages, backwardCarriages } = useSelector(
    (state: RootState) => state.carriages
  );

  const maxCountSeats = 4;
  const totalSeatsCount = adults.count + children.count + baby.count;
  const availableSeats = maxCountSeats - totalSeatsCount;
  const babyAvailableSeatsCount = Math.max(
    0,
    Math.min(adults.count - baby.count, availableSeats)
  );

  const seatsData = [
    {
      type: 'Взрослых',
      number: adults.count,
      text: availableSeats
        ? `Можно добавить еще ${availableSeats} ${
            availableSeats === 1 ? 'пассажира' : 'пассажиров'
          }`
        : 'Больше добавить пассажиров не получится',
      isActive: adults.isActive,
    },
    {
      type: 'Детских',
      number: children.count,
      text: availableSeats
        ? `Можно добавить еще ${availableSeats} ${
            availableSeats === 1 ? 'пассажира' : 'пассажиров'
          }`
        : 'Больше добавить пассажиров не получится',
      isActive: children.isActive,
    },
    {
      type: 'Детских «без места»',
      number: baby.count,
      text: availableSeats
        ? babyAvailableSeatsCount
          ? `Можно добавить еще ${babyAvailableSeatsCount} ${
              babyAvailableSeatsCount === 1 ? 'пассажира' : 'пассажиров'
            }`
          : 'Младенцы не могут путешествовать без взрослых'
        : 'Больше добавить пассажиров не получится',
      isActive: baby.isActive,
    },
  ];

  const handleChangeActiveItem = (index: number) => {
    dispatch(
      isForward
        ? setDepartureActivePerson(index)
        : dispatch(setArrivalActivePerson(index))
    );

    if (!currentCarriageType) {
      return;
    }

    const matchedCarriagesList = (
      isForward ? forwardCarriages : backwardCarriages
    ).filter((carriage) => carriage.coach.class_type === currentCarriageType);

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

        if (index === 0) {
          available = seat.available && !isChildrenSelected;
          isActive = isAdultSelected;
        } else if (index === 1) {
          available = seat.available && !isAdultSelected && !isChildrenSelected;
          isActive = isChildrenSelected;
        } else if (index === 2) {
          available = isAdultSelected && !isBabySelected;
          isActive = isBabySelected;
        }

        return {
          ...seat,
          available,
          isActive,
        };
      }),
    }));

    const isMaxSeatsSelected = orderList.length === maxCountSeats;

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
      dispatch(setDepartureCopyCurrentTypeCarriagesList(newCopyList));
      dispatch(setDepartureCurrentTypeCarriagesList(newList));
      return;
    }

    dispatch(setArrivalCopyCurrentTypeCarriagesList(newCopyList));
    dispatch(setArrivalCurrentTypeCarriagesList(newList));
  };

  return (
    <div className="seats-count">
      <h4 className="seats-count__title">Количество билетов</h4>
      <ul className="seats-count__list">
        {seatsData.map((seat, index) => (
          <li
            key={index}
            className={`seats-count__item${
              seat.isActive ? ' seats-count__item_active' : ''
            }`}
            onClick={
              seat.isActive ? undefined : () => handleChangeActiveItem(index)
            }
          >
            <div className="seats-count__details">
              <span className="seats-count__type">{seat.type}</span>
              <span className="seats-count__separator">—</span>
              <span className="seats-count__number">{seat.number}</span>
            </div>
            {seat.text && <p className="seats-count__text">{seat.text}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeatsCount;