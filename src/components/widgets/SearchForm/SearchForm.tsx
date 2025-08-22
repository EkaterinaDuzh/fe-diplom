import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format, isSameDay } from 'date-fns';

import { AppDispatch, RootState } from '../../../redux/store';
import { resetArrivalSlice } from '../../../redux/arrivalSlice';
import { resetDepartureSlice } from '../../../redux/departureSlice';
import { fetchLastTickets } from '../../../redux/lastTicketsSlice';
import { openModal } from '../../../redux/modalSlice';
import {
  setParamStartTown,
  setParamEndTown,
  setParamStartDate,
  setParamEndDate,
} from '../../../redux/paramsSlice';
import {
  setStartTown,
  setStartTownTooltip,
  setEndTown,
  setEndTownTooltip,
  setStartDateTooltip,
  setEndDateTooltip,
} from '../../../redux/searchFormSlice';
import { fetchTrains } from '../../../redux/trainsSlice';

import Destination from '../RouteSelection/Destination';
import MyDatePicker from '../../UI/inputs/MyDatePicker/MyDatePicker';
import './SearchForm.css';

const SearchForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { startTown, endTown, startDate, endDate } = useSelector(
    (state: RootState) => state.searchForm
  );

  const {
    paramStartTown,
    paramEndTown,
    paramStartDate,
    paramEndDate,
    minPrice,
    maxPrice,
    startDepartureHourFrom,
    startDepartureHourTo,
    endDepartureHourFrom,
    endDepartureHourTo,
    startArrivalHourFrom,
    startArrivalHourTo,
    endArrivalHourFrom,
    endArrivalHourTo,
    haveFirstClass,
    haveSecondClass,
    haveThirdClass,
    haveFourthClass,
    haveWifi,
    haveExpress,
  } = useSelector((state: RootState) => state.params);

  const changeDestinations = () => {
    const tmp = startTown ? { ...startTown } : null;
    dispatch(setStartTown(endTown ? { ...endTown } : null));
    dispatch(setEndTown(tmp));
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!startTown || !endTown || !startDate || !endDate) {
      if (!startTown) {
        dispatch(setStartTownTooltip('Пожалуйста, выберите город'));
      }
      if (!endTown) {
        dispatch(setEndTownTooltip('Пожалуйста, выберите город'));
      }
      if (!startDate) {
        dispatch(setStartDateTooltip('Пожалуйста, выберите корректную дату'));
      }
      if (!endDate) {
        dispatch(setEndDateTooltip('Пожалуйста, выберите корректную дату'));
      }
      return;
    }

    if (startTown._id === endTown._id) {
      const modalOptions = {
        type: 'warning',
        title: 'Нельзя путешествовать в одном городе!',
        text: 'Город отправления и город прибытия должны отличаться. Пожалуйста, исправьте данные в форме!',
      };

      dispatch(openModal(modalOptions));
      return;
    }

    if (
      paramStartTown &&
      paramEndTown &&
      paramStartDate &&
      paramEndDate &&
      startTown._id === paramStartTown._id &&
      endTown._id === paramEndTown._id &&
      isSameDay(startDate, paramStartDate) &&
      isSameDay(endDate, paramEndDate)
    ) {
      const modalOptions = {
        type: 'warning',
        title: 'Данные в форме не были изменены!',
        text: 'Вы уже просматриваете билеты в соответствии с данным запросом.',
      };

      dispatch(openModal(modalOptions));
      return;
    }

    const requestOptions = {
      from_city_id: startTown._id,
      to_city_id: endTown._id,

      date_start: format(startDate, 'yyyy-MM-dd'),
      date_end: format(endDate, 'yyyy-MM-dd'),

      minPrice,
      maxPrice,

      startDepartureHourFrom,
      startDepartureHourTo,
      endDepartureHourFrom,
      endDepartureHourTo,

      startArrivalHourFrom,
      startArrivalHourTo,
      endArrivalHourFrom,
      endArrivalHourTo,

      firstClass: haveFirstClass,
      secondClass: haveSecondClass,
      thirdClass: haveThirdClass,
      fourthClass: haveFourthClass,

      wifi: haveWifi,
      express: haveExpress,
    };

    dispatch(setParamStartTown(startTown));
    dispatch(setParamEndTown(endTown));
    dispatch(setParamStartDate(startDate));
    dispatch(setParamEndDate(endDate));

    dispatch(fetchTrains(requestOptions));

    if (location.pathname !== '/trains') {
      if (location.pathname !== '/') {
        dispatch(resetArrivalSlice());
        dispatch(resetDepartureSlice());
      }

      dispatch(fetchLastTickets());
      navigate('/trains');
    }
  };

  return (
    <form className="search-form" onSubmit={handleOnSubmit}>
      <div className="search-form__container">
        <fieldset className="search-form__fieldset">
          <legend className="search-form__legend">Направление</legend>
          <div className="search-form__destination">
            <Destination isStart />
            <span
              className="search-form__swap"
              onClick={changeDestinations}
            ></span>
            <Destination isStart={false} />
          </div>
        </fieldset>

        <fieldset className="search-form__fieldset">
          <legend className="search-form__legend">Дата</legend>
          <div className="search-form__date">
            <MyDatePicker isStart isInForm />
            <MyDatePicker isStart={false} isInForm />
          </div>
        </fieldset>
      </div>

      <fieldset className="search-form__fieldset">
        <legend className="visually-hidden">Найти билеты</legend>
        <button type="submit" className="search-form__btn">
          найти билеты
        </button>
      </fieldset>
    </form>
  );
};

export default SearchForm;