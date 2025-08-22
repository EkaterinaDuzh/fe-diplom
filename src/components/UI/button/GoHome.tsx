import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../../redux/store';
import { resetArrivalSlice } from '../../../redux/arrivalSlice';
import { resetCarriagesSlice } from '../../../redux/carriagesSlice';
import { resetCheckboxDetailsSlice } from '../../../redux/checkboxDetailsSlice';
import { resetCheckboxSlice } from '../../../redux/checkboxSlice';
import { resetDepartureSlice } from '../../../redux/departureSlice';
import { resetLastTicketsSlice } from '../../../redux/lastTicketsSlice';
import { resetOrderSlice } from '../../../redux/orderSlice';
import { resetParamsSlice } from '../../../redux/paramsSlice';
import { resetPassengersSlice } from '../../../redux/passengersSlice';
import { resetPaymentSlice } from '../../../redux/paymentSlice';
import { resetSearchFormSlice } from '../../../redux/searchFormSlice';
import { resetTownsSlice } from '../../../redux/townsSlice';
import { resetTrainsSlice } from '../../../redux/trainsSlice';

import './GoHome.css';

const GoHome = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleResetStore = () => {
    dispatch(resetOrderSlice());
    dispatch(resetPaymentSlice());
    dispatch(resetPassengersSlice());
    dispatch(resetArrivalSlice());
    dispatch(resetDepartureSlice());
    dispatch(resetCarriagesSlice());
    dispatch(resetTrainsSlice());
    dispatch(resetLastTicketsSlice());
    dispatch(resetTownsSlice());
    dispatch(resetParamsSlice());
    dispatch(resetSearchFormSlice());
    dispatch(resetCheckboxDetailsSlice());
    dispatch(resetCheckboxSlice());
  };

  return (
    <Link className="go-home" to="/" onClick={handleResetStore}>
      вернуться на главную
    </Link>
  );
};

export default GoHome;