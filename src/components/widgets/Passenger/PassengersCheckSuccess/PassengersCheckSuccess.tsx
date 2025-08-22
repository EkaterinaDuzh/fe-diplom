import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { setIsOpen } from "../../../../redux/passengersSlice";
import NextPassenger from "../../../UI/button/NextPage";
import success from "./img/success.svg";
import "./PassengersCheckSuccess.css";

const PassengersCheckSuccess = ({ index }: { index: number }) => {
  const dispatch: AppDispatch = useDispatch();

  const { passengersList } = useSelector(
    (state: RootState) => state.passengers
  );

  const handleNextPassengerClick = () => {
    if (passengersList.length > index + 1) {
      dispatch(setIsOpen({ index: index + 1, isOpen: true }));
      const nextPassenger = document.getElementById(`passenger-${index + 1}`);
      nextPassenger?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const nextPageButton = document.querySelector(".next-page");
      nextPageButton?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <div className="passengers-check_success">
      <div className="passengers-check__wrapper_success">
        <img
          className="passengers-check__icon_success"
          src={success}
          alt="success"
        />
        <span className="passengers-check__text_success">Готово</span>
      </div>

      <NextPassenger
        onClick={handleNextPassengerClick}
        text="Готово"
        isActive={true}
      />
    </div>
  );
};

export default PassengersCheckSuccess;