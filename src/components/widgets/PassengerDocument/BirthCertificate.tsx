import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { setCertificateNumber } from '../../../redux/passengersSlice';

import './BirthCertificate.css';

interface IBirthCertificate {
  index: number;
  certificateNumber: { value: string; isValid: boolean; hasError: boolean };
}

const BirthCertificate = (props: IBirthCertificate) => {
  const { index, certificateNumber } = props;

  const dispatch: AppDispatch = useDispatch();

  const handleCertificateNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { target } = event;
    const { value } = target;

    const cursorPosition = target.selectionStart || 0;

    const filteredValue = value.replace(/[^IVXLCDM\dА-Я]/gi, '').toUpperCase();

    if (certificateNumber.value === filteredValue) {
      return;
    }

    const isValid = /^[IVXLCDM]{1,4}[А-Я]{2}\d{6}$/.test(filteredValue);

    const payload = {
      index,
      value: filteredValue,
      isValid,
      hasError: !isValid,
    };

    dispatch(setCertificateNumber(payload));

    setTimeout(() => {
      target.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  return (
    <div className="birth-certificate">
      <label
        htmlFor={`birth-certificate-number-${index}`}
        className="birth-certificate__label"
      >
        Номер
      </label>

      <input
        id={`birth-certificate-number-${index}`}
        className={`birth-certificate__input${
          certificateNumber.hasError ? ' birth-certificate__input_invalid' : ''
        }`}
        type="text"
        minLength={9}
        maxLength={12}
        placeholder="____________"
        required
        value={certificateNumber.value}
        onChange={handleCertificateNumberChange}
      />
    </div>
  );
};

export default BirthCertificate;