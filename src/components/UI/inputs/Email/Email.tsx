import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { setPaymentEmail } from '../../../../redux/paymentSlice';
import './Email.css';

interface IEmailProps {
  value: string;
  isValid: boolean;
  hasError: boolean;
}

const Email = ({ value, hasError }: IEmailProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: currentValue } = event.target;

    const filteredValue = currentValue.replace(/[^a-z\d@._%+-]/gi, '');

    if (filteredValue === value) {
      return;
    }

    const startRegexp = '^[a-z\\d]';
    const centerRegexp = '[a-z\\d._%+-]*[a-z\\d]';
    const endRegexp = '@[a-z\\d.-]+\\.[a-z]{2,}$';

    const emailRegexp = new RegExp(startRegexp + centerRegexp + endRegexp, 'i');

    const isValid =
      emailRegexp.test(filteredValue) && !/\.\./.test(filteredValue);

    const payload = {
      value: filteredValue,
      isValid,
      hasError: !isValid,
    };

    dispatch(setPaymentEmail(payload));
  };

  return (
    <div className="email">
      <label htmlFor="email" className="email__label">
        E-mail
      </label>

      <input
        id="email"
        className={`email__input${hasError ? ' email__input_invalid' : ''}`}
        type="email"
        placeholder="inbox@gmail.ru"
        required
        value={value}
        onChange={handleEmailChange}
      />
    </div>
  );
};

export default Email;