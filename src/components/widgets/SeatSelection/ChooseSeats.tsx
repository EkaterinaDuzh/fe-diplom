import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getRandomNumber from '../../../libs/getRandomNumber';
import { AppDispatch, RootState } from '../../../redux/store';
import { setArrivalRouteDestinationId } from '../../../redux/arrivalSlice';
import {
  fetchForwardCarriages,
  fetchBackwardCarriages,
} from '../../../redux/carriagesSlice';
import { setDepartureRouteDestinationId } from '../../../redux/departureSlice';
import {
  setCurrentTrainIndex,
  setCurrentPotentialPassengersCount,
} from '../../../redux/trainsSlice';
import './ChooseSeats.css';

const ChooseSeats = ({ index }: { index: number }) => {
  const dispatch: AppDispatch = useDispatch();

  const { trains } = useSelector((state: RootState) => state.trains);

  const handleClick = () => {
    const forwardDestinationId = trains[index].departure._id;
    const backwardDestinationId = trains[index].arrival?._id || '';

    dispatch(setCurrentPotentialPassengersCount(getRandomNumber(0, 20)));

    dispatch(setCurrentTrainIndex(index));
    dispatch(setDepartureRouteDestinationId(forwardDestinationId));
    dispatch(fetchForwardCarriages(forwardDestinationId));

    if (backwardDestinationId) {
      dispatch(setArrivalRouteDestinationId(backwardDestinationId));
      dispatch(fetchBackwardCarriages(backwardDestinationId));
    }
  };

  return (
    <div className="choose-seats">
      <Link className="choose-seats__link" to="/seats" onClick={handleClick}>
        Выбрать места
      </Link>
    </div>
  );
};

export default ChooseSeats;