import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { setGender } from '../../../../redux/passengersSlice';
import './Gender.css';

interface IGenderProps {
  index: number;
  gender: boolean;
}

const Gender = ({ index, gender }: IGenderProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const isMale = value === 'male';

    if (isMale !== gender) {
      dispatch(setGender({ index, gender: isMale }));
    }
  };

  return (
    <div className="gender">
      <label htmlFor={`male-${index}`} className="gender__title">
        Пол
      </label>

      <div className="gender__switcher">
        <input
          className="gender__input visually-hidden"
          id={`male-${index}`}
          type="radio"
          name={`gender-${index}`}
          value="male"
          checked={gender}
          onChange={handleGenderChange}
        />
        <label
          className="gender__label gender__label_male"
          htmlFor={`male-${index}`}
        >
          М
        </label>

        <input
          className="gender__input visually-hidden"
          id={`female-${index}`}
          type="radio"
          name={`gender-${index}`}
          value="female"
          checked={!gender}
          onChange={handleGenderChange}
        />
        <label
          className="gender__label gender__label_female"
          htmlFor={`female-${index}`}
        >
          Ж
        </label>
      </div>
    </div>
  );
};

export default Gender;