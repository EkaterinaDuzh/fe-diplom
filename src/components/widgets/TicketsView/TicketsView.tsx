import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import {
  setCurrentCount,
  setCurrentPage,
  setTrains,
} from '../../../redux/trainsSlice';
import { ITrain } from '../../../models/models';
import './TicketsView.css';

const TicketsView = () => {
  const timeFilter = 'времени';
  const priceFilter = 'стоимости';
  const durationFilter = 'длительности';
  const shownCountOfTicketsList = [5, 10, 20];

  const [currentfilter, setCurrentFilter] = useState<string>(timeFilter);
  const [isOpenFiltersList, setIsOpenFiltersList] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const { trains, currentCount } = useSelector(
    (state: RootState) => state.trains
  );

  const handleSetTimeFilter = () => {
    setCurrentFilter(timeFilter);
    setIsOpenFiltersList(false);

    const sortedTrainsByTime = JSON.parse(JSON.stringify(trains)).sort(
      (a: ITrain, b: ITrain) =>
        a.departure.from.datetime - b.departure.from.datetime
    );

    dispatch(setTrains(sortedTrainsByTime));
  };

  const handleSetPriceFilter = () => {
    setCurrentFilter(priceFilter);
    setIsOpenFiltersList(false);

    const sortedTrainsByPrice = JSON.parse(JSON.stringify(trains)).sort(
      (a: ITrain, b: ITrain) => {
        const minPriceA = Math.min(
          a.departure.min_price,
          a.arrival?.min_price || +Infinity
        );

        const minPriceB = Math.min(
          b.departure.min_price,
          b.arrival?.min_price || +Infinity
        );

        return minPriceA - minPriceB;
      }
    );

    dispatch(setTrains(sortedTrainsByPrice));
  };

  const handleSetDurationFilter = () => {
    setCurrentFilter(durationFilter);
    setIsOpenFiltersList(false);

    const sortedTrainsByDuration = JSON.parse(JSON.stringify(trains)).sort(
      (a: ITrain, b: ITrain) => {
        const durationA = a.departure.duration + (a.arrival?.duration || 0);
        const durationB = b.departure.duration + (a.arrival?.duration || 0);
        return durationA - durationB;
      }
    );

    dispatch(setTrains(sortedTrainsByDuration));
  };

  const handleCountFilterClick = (count: number) => {
    if (currentCount !== count) {
      dispatch(setCurrentCount(count));
      dispatch(setCurrentPage(1));
    }
  };

  return (
    <div className="tickets-view">
      <div className="tickets-view__found">
        <span className="tickets-view__found-text">найдено</span>
        <span className="tickets-view__found-number">{trains.length}</span>
      </div>

      <div className="tickets-view__filters">
        <div className="tickets-view__sorting">
          <span className="tickets-view__sorting-text">сортировать по:</span>
          <div className="tickets-view__sorting-filters">
            <span
              className="tickets-view__sorting-active-filter"
              onClick={() => setIsOpenFiltersList(true)}
            >
              {currentfilter}
            </span>

            {isOpenFiltersList && (
              <ul className="tickets-view__sorting-filter-list">
                <li
                  className="tickets-view__sorting-filter-item"
                  onClick={handleSetTimeFilter}
                >
                  {timeFilter}
                </li>
                <li
                  className="tickets-view__sorting-filter-item"
                  onClick={handleSetPriceFilter}
                >
                  {priceFilter}
                </li>
                <li
                  className="tickets-view__sorting-filter-item"
                  onClick={handleSetDurationFilter}
                >
                  {durationFilter}
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="tickets-view__displaying">
          <span className="tickets-view__displaying-text">показывать по:</span>
          <>
            {shownCountOfTicketsList.map((count) => (
              <span
                key={count}
                className={`tickets-view__displaying-filter${
                  currentCount === count
                    ? ' tickets-view__displaying-filter_active'
                    : ''
                }`}
                onClick={() => handleCountFilterClick(count)}
              >
                {count}
              </span>
            ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default TicketsView;