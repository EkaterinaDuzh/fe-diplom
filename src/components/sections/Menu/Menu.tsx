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
import './Menu.css';

const Menu = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleGoHome = () => {
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
    <nav className="menu">
      <ul className="menu__list">
        <li className="menu__item">
          {}
          <Link
            to="/#about"
            className="menu__link"
            onClick={() => handleGoHome()}
          >
            О нас
          </Link>
        </li>
        <li className="menu__item">
          {}
          <Link
            to="/#description"
            className="menu__link"
            onClick={() => handleGoHome()}
          >
            Как это работает
          </Link>
        </li>
        <li className="menu__item">
          {}
          <Link
            to="/#feedback"
            className="menu__link"
            onClick={() => handleGoHome()}
          >
            Отзывы
          </Link>
        </li>
        <li className="menu__item">
          {}
          <Link to="#footer" className="menu__link">
            Контакты
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;