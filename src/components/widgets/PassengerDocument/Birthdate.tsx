import { useDispatch } from 'react-redux';
import checkPassengerAge from '../../../libs/checkPassengerAge';
import { AppDispatch } from '../../../redux/store';
import { setBirthdate } from '../../../redux/passengersSlice';
import './Birthdate.css';

interface IBirthdateProps {
  index: number;
  birthdate: { value: string; isValid: boolean; hasError: boolean };
}

const Birthdate = ({ index, birthdate }: IBirthdateProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleBirthdateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { target } = event;
    const { value } = target;

    const cursorPosition = target.selectionStart || 0;

    const filteredValue = value.replace(/\D\./g, '');

    if (birthdate.value === filteredValue) {
      return;
    }

    const isValidDate = checkPassengerAge(filteredValue, 110);

    const payload = {
      index,
      value: filteredValue,
      isValid: isValidDate,
      hasError: !isValidDate,
    };

    dispatch(setBirthdate(payload));

    setTimeout(() => {
      target.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  return (
    <div className="birthdate">
      <label htmlFor={`birthdate-${index}`} className="birthdate__label">
        Дата рождения
      </label>
      <input
        id={`birthdate-${index}`}
        className="birthdate__input"
        type="text"
        placeholder="ДД.ММ.ГГГГ"
        minLength={10}
        maxLength={10}
        required
        value={birthdate.value}
        onChange={handleBirthdateChange}
      />
    </div>
  );
};

export default Birthdate;