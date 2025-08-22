import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { addPassengerToList } from '../../../../redux/passengersSlice';
import add from './img/add.svg';
import './AddPassenger.css';

const AddPassenger = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleAddPassengersData = () => {
    dispatch(addPassengerToList());
  };

  return (
    <div className="add-passenger">
      <div className="add-passenger__text">Добавить пассажира</div>
      <img
        className="add-passenger__icon"
        src={add}
        alt="добавить"
        onClick={handleAddPassengersData}
      />
    </div>
  );
};

export default AddPassenger;