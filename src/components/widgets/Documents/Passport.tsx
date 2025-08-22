import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import {
  setPassportSeries,
  setPassportNumber,
} from '../../../redux/passengersSlice';
import './Passport.css';

interface IPassportProps {
  index: number;
  passportSeries: { value: string; isValid: boolean; hasError: boolean };
  passportNumber: { value: string; isValid: boolean; hasError: boolean };
}

const Passport = (props: IPassportProps) => {
  const { index, passportSeries, passportNumber } = props;

  const dispatch: AppDispatch = useDispatch();

  const handleSeriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;

    const cursorPosition = target.selectionStart || 0;

    const filteredValue = value.replace(/\D/g, '');

    if (passportSeries.value === filteredValue) {
      return;
    }

    const isValid = filteredValue.length === 4;

    const payload = {
      index,
      value: filteredValue,
      isValid,
      hasError: !isValid,
    };

    dispatch(setPassportSeries(payload));

    setTimeout(() => {
      target.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;

    const cursorPosition = target.selectionStart || 0;

    const filteredValue = value.replace(/\D/g, '');

    if (passportNumber.value === filteredValue) {
      return;
    }

    const isValid = filteredValue.length === 6;

    const payload = {
      index,
      value: filteredValue,
      isValid,
      hasError: !isValid,
    };

    dispatch(setPassportNumber(payload));

    setTimeout(() => {
      target.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  return (
    <>
      <div className="passport__column">
        <label htmlFor={`passport-series-${index}`} className="passport__label">
          Серия
        </label>
        <input
          id={`passport-series-${index}`}
          className={`passport__input${
            passportSeries.hasError ? ' passport__input_invalid' : ''
          }`}
          type="text"
          minLength={4}
          maxLength={4}
          placeholder="____"
          required
          value={passportSeries.value}
          onChange={handleSeriesChange}
        />
      </div>

      <div className="passport__column">
        <label htmlFor={`passport-number-${index}`} className="passport__label">
          Номер
        </label>
        <input
          id={`passport-number-${index}`}
          className={`passport__input${
            passportNumber.hasError ? ' passport__input_invalid' : ''
          }`}
          type="text"
          minLength={6}
          maxLength={6}
          placeholder="______"
          required
          value={passportNumber.value}
          onChange={handleNumberChange}
        />
      </div>
    </>
  );
};

export default Passport;