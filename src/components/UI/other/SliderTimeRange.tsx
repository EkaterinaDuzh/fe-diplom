import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../redux/store';
import { resetArrivalSlice } from '../../../redux/arrivalSlice';
import { resetDepartureSlice } from '../../../redux/departureSlice';
import {
  setStartDepartureHourFrom,
  setStartDepartureHourTo,
  setEndDepartureHourFrom,
  setEndDepartureHourTo,
  setStartArrivalHourFrom,
  setStartArrivalHourTo,
  setEndArrivalHourFrom,
  setEndArrivalHourTo,
} from '../../../redux/paramsSlice';
import { fetchLastTickets } from '../../../redux/lastTicketsSlice';
import { fetchTrains } from '../../../redux/trainsSlice';
import './SliderTimeRange.css';

interface ISliderTimeRangeProps {
  destination: 'forward' | 'backward';
  type: 'departure' | 'arrival';
}

const SliderTimeRange = ({ destination, type }: ISliderTimeRangeProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

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

  const leftValueRef = useRef<HTMLSpanElement>(null);
  const rightValueRef = useRef<HTMLSpanElement>(null);

  const [valuePosition, setValuePosition] = useState({
    leftForValue: 0,
    rightForValue: 0,
  });
  const { leftForValue, rightForValue } = valuePosition;

  const minRange = 0;
  const maxRange = 24;
  const sliderWidth = 300;

  let lowerValue: number;
  let upperValue: number;

  if (destination === 'forward') {
    lowerValue =
      type === 'departure' ? startDepartureHourFrom : startArrivalHourFrom;
    upperValue =
      type === 'departure' ? startDepartureHourTo : startArrivalHourTo;
  } else {
    lowerValue =
      type === 'departure' ? endDepartureHourFrom : endArrivalHourFrom;
    upperValue = type === 'departure' ? endDepartureHourTo : endArrivalHourTo;
  }

  const lowerPercent = ((lowerValue - minRange) / (maxRange - minRange)) * 100;
  const upperPercent = ((upperValue - minRange) / (maxRange - minRange)) * 100;

  const left = lowerPercent;
  const right = 100 - upperPercent;

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHour =
      Number(event.target.value) < upperValue
        ? Number(event.target.value)
        : upperValue - 5;

    if (destination === 'forward') {
      dispatch(
        type === 'departure'
          ? setStartDepartureHourFrom(newHour)
          : setStartArrivalHourFrom(newHour)
      );
    } else {
      dispatch(
        type === 'departure'
          ? setEndDepartureHourFrom(newHour)
          : setEndArrivalHourFrom(newHour)
      );
    }
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHour =
      Number(event.target.value) > lowerValue
        ? Number(event.target.value)
        : lowerValue + 5;

    if (destination === 'forward') {
      dispatch(
        type === 'departure'
          ? setStartDepartureHourTo(newHour)
          : setStartArrivalHourTo(newHour)
      );
    } else {
      dispatch(
        type === 'departure'
          ? setEndDepartureHourTo(newHour)
          : setEndArrivalHourTo(newHour)
      );
    }
  };

  const handleMouseUp = () => {
    if (!paramStartTown || !paramEndTown || !paramStartDate || !paramEndDate) {
      return;
    }

    const requestOptions = {
      from_city_id: paramStartTown._id,
      to_city_id: paramEndTown._id,
      date_start: format(paramStartDate, 'yyyy-MM-dd'),
      date_end: format(paramEndDate, 'yyyy-MM-dd'),
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

    dispatch(fetchTrains(requestOptions));

    if (location.pathname !== '/trains') {
      dispatch(resetArrivalSlice());
      dispatch(resetDepartureSlice());

      dispatch(fetchLastTickets());
      navigate('/trains');
    }
  };

  useEffect(() => {
    if (leftValueRef.current) {
      const leftWidth = leftValueRef.current.offsetWidth;
      let leftValuePosition = left - ((leftWidth / 2) * 100) / sliderWidth;
      leftValuePosition = leftValuePosition < 0 ? 0 : leftValuePosition;

      setValuePosition((prevState) => ({
        ...prevState,
        leftForValue: leftValuePosition,
      }));
    }

    if (rightValueRef.current) {
      const rightWidth = rightValueRef.current.offsetWidth;
      let rightValuePosition = right - ((rightWidth / 2) * 100) / sliderWidth;
      rightValuePosition = rightValuePosition < 0 ? 0 : rightValuePosition;

      setValuePosition((prevState) => ({
        ...prevState,
        rightForValue: rightValuePosition,
      }));
    }
  }, [left, right]);

  return (
    <>
      <div className="slider-time-range">
        {}
        <div
          className="slider-time-range__fill"
          style={{
            left: `${left}%`,
            right: `${right}%`,
          }}
        ></div>

        {}
        <input
          className="slider-time-range__lower"
          type="range"
          id="lower"
          min="0"
          max="24"
          step="1"
          onChange={handleMinChange}
          onMouseUp={handleMouseUp}
          value={lowerValue}
        />

        {}
        <span
          ref={leftValueRef}
          className="slider-time-range__min-value"
          style={{
            left: `${leftForValue}%`,
          }}
        >
          {lowerValue + ':00'}
        </span>

        {}
        <input
          className="slider-time-range__upper"
          type="range"
          id="upper"
          min="0"
          max="24"
          step="1"
          onChange={handleMaxChange}
          onMouseUp={handleMouseUp}
          value={upperValue}
        />

        {}
        <span
          ref={rightValueRef}
          className="slider-time-range__max-value"
          style={{
            right: `${rightForValue}%`,
          }}
        >
          {upperValue + ':00'}
        </span>
      </div>
    </>
  );
};

export default SliderTimeRange;