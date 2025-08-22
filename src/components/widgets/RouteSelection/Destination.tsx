import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../../redux/store';
import {
  setStartTown,
  setStartTownTooltip,
  setEndTown,
  setEndTownTooltip,
} from '../../../redux/searchFormSlice';
import {
  clearTowns,
  fetchTowns,
  setIsClicked,
  setIsOpenedStartList,
  setIsOpenedEndList,
} from '../../../redux/townsSlice';

import Towns from '../../UI/inputs/Towns/Towns';
import './Destination.css';
import Tooltip from '../../UI/other/Tooltip';

const Destination = ({ isStart }: { isStart: boolean }) => {
  const [currentValue, setCurrentValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const { startTown, startTownTooltip, endTown, endTownTooltip } = useSelector(
    (state: RootState) => state.searchForm
  );
  const { towns, isClicked, isOpenedStartList, isOpenedEndList } = useSelector(
    (state: RootState) => state.towns
  );

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      dispatch(isStart ? setStartTown(null) : setEndTown(null));
    }
  };

  const handleChangeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (startTown) {
      dispatch(setStartTown(null));
    }

    setCurrentValue(event.target.value);

    dispatch(fetchTowns(event.target.value));

    dispatch(setIsOpenedStartList(true));
  };

  const handleChangeEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (endTown) {
      dispatch(setEndTown(null));
    }

    setCurrentValue(event.target.value);

    dispatch(fetchTowns(event.target.value));

    dispatch(setIsOpenedEndList(true));
  };

  const handleBlurStart = () => {
    if (isClicked) {
      setCurrentValue('');
      dispatch(setIsClicked(false));
      return;
    }

    const foundTown = towns.find(
      (town) => town.name === currentValue.toLowerCase().trim()
    );

    if (foundTown) {
      dispatch(setStartTown(foundTown));
      dispatch(setStartTownTooltip(''));
    }

    setCurrentValue('');

    dispatch(setIsOpenedStartList(false));

    dispatch(clearTowns());
  };

  const handleBlurEnd = () => {
    if (isClicked) {
      setCurrentValue('');
      dispatch(setIsClicked(false));
      return;
    }

    const foundTown = towns.find(
      (town) => town.name === currentValue.toLowerCase().trim()
    );

    if (foundTown) {
      dispatch(setEndTown(foundTown));
      dispatch(setEndTownTooltip(''));
    }

    setCurrentValue('');

    dispatch(setIsOpenedEndList(false));

    dispatch(clearTowns());
  };

  return (
    <div className="destination">
      <input
        className="destination__input"
        type="text"
        placeholder={isStart ? 'Откуда' : 'Куда'}
        value={(isStart ? startTown?.name : endTown?.name) || currentValue}
        onChange={isStart ? handleChangeStart : handleChangeEnd}
        onBlur={isStart ? handleBlurStart : handleBlurEnd}
        ref={inputRef}
      />
      <span className="destination__icon" onClick={handleIconClick}></span>

      {(isStart ? isOpenedStartList : isOpenedEndList) && (
        <Towns isStart={isStart} />
      )}

      {}
      <Tooltip text={isStart ? startTownTooltip : endTownTooltip} />
    </div>
  );
};

export default Destination;