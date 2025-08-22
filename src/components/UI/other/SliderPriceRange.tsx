import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../redux/store';
import { resetArrivalSlice } from '../../../redux/arrivalSlice';
import { resetDepartureSlice } from '../../../redux/departureSlice';
import { setMinPrice, setMaxPrice } from '../../../redux/paramsSlice';
import { fetchLastTickets } from '../../../redux/lastTicketsSlice';
import { fetchTrains } from '../../../redux/trainsSlice';
import './SliderPriceRange.css';

const SliderPriceRange = () => {
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
  const maxRange = 7_000;
  const sliderWidth = 294;
  const thumbRadius = 12;

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice =
      Number(event.target.value) < maxPrice
        ? Number(event.target.value)
        : maxPrice - 1_000;

    dispatch(setMinPrice(newPrice));
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice =
      Number(event.target.value) > minPrice
        ? Number(event.target.value)
        : minPrice + 1_000;

    dispatch(setMaxPrice(newPrice));
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

  const calculateSliderPositions = (
    lowerValue: number,
    upperValue: number,
    minRange: number,
    maxRange: number,
    sliderWidth: number,
    thumbRadius: number
  ) => {
    const lowerPercent =
      ((lowerValue - minRange) / (maxRange - minRange)) * 100;
    const upperPercent =
      ((upperValue - minRange) / (maxRange - minRange)) * 100;

    let left = lowerPercent;
    let right = 100 - upperPercent;

    const thumbRadiusPercent = (thumbRadius * 100) / sliderWidth;

    if (right < thumbRadiusPercent) {
      right = thumbRadiusPercent;
      left = left > 100 - thumbRadius * 4 ? left - thumbRadiusPercent : left;
    }

    if (left < thumbRadiusPercent) {
      left = thumbRadiusPercent;
      right =
        right > 100 - thumbRadius * 4 ? right - thumbRadiusPercent : right;
    }

    return { left, right };
  };

  const { left, right } = calculateSliderPositions(
    minPrice,
    maxPrice,
    minRange,
    maxRange,
    sliderWidth,
    thumbRadius
  );

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
    <div className="slider-price-range">
      {}
      <div
        className="slider-price-range__fill"
        style={{
          left: `${left}%`,
          right: `${right}%`,
        }}
      ></div>

      {}
      <input
        className="slider-price-range__lower"
        type="range"
        id="lower"
        min="0"
        max="7000"
        step="100"
        onChange={handleMinChange}
        onMouseUp={handleMouseUp}
        value={minPrice}
      />

      {}
      <span
        ref={leftValueRef}
        className="slider-price-range__min-value"
        style={{
          left: `${leftForValue}%`,
        }}
      >
        {minPrice}
      </span>

      {}
      <input
        className="slider-price-range__upper"
        type="range"
        id="upper"
        min="0"
        max="7000"
        step="100"
        onChange={handleMaxChange}
        onMouseUp={handleMouseUp}
        value={maxPrice}
      />

      {}
      <span
        ref={rightValueRef}
        className="slider-price-range__max-value"
        style={{
          right: `${rightForValue}%`,
        }}
      >
        {maxPrice}
      </span>
    </div>
  );
};

export default SliderPriceRange;