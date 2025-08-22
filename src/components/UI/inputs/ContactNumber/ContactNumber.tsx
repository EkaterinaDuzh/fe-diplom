import PhoneInput from 'react-phone-number-input';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { setPaymentPhoneNumber } from '../../../../redux/paymentSlice';
import 'react-phone-number-input/style.css';
import './ContactNumber.css';

interface IContactNumberProps {
  value: string;
  isValid: boolean;
  hasError: boolean;
}

const ContactNumber = ({ value, hasError }: IContactNumberProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleContactNumberChange = (value?: string) => {
    if (!value) {
      const payload = {
        value: '',
        isValid: false,
        hasError: true,
      };

      dispatch(setPaymentPhoneNumber(payload));
      return;
    }

    const cleanValue = value.replace(/\D/g, '').slice(0, 11);

    const phoneNumber =
      cleanValue.startsWith('7') || cleanValue.startsWith('8')
        ? `+7${cleanValue.slice(1)}`
        : `+7${cleanValue}`;

    const isValid = /^\+7\d{10}$/.test(phoneNumber);

    const payload = {
      value: phoneNumber,
      isValid,
      hasError: !isValid,
    };

    dispatch(setPaymentPhoneNumber(payload));
  };

  return (
    <div className="contact-number">
      <label htmlFor="contact-number" className="contact-number__label">
        Контактный телефон
      </label>

      <PhoneInput
        id="contact-number"
        className={`${hasError ? ' contact-number__input_invalid' : ''}`}
        placeholder="+7 999 123 45 67"
        international
        defaultCountry="RU"
        maxLength={16}
        value={value}
        onChange={handleContactNumberChange}
      />
    </div>
  );
};

export default ContactNumber;