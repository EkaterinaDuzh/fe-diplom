import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../../redux/store";
import {
  setStartTown,
  setStartTownTooltip,
  setEndTown,
  setEndTownTooltip,
} from "../../../../redux/searchFormSlice";
import {
  clearTowns,
  setIsClicked,
  setIsOpenedStartList,
  setIsOpenedEndList,
} from "../../../../redux/townsSlice";

import { ITown } from "../../../../models/models";
import "./Towns.css";

const Towns = ({ isStart }: { isStart: boolean }) => {
  const dispatch: AppDispatch = useDispatch();
  const { towns } = useSelector((state: RootState) => state.towns);

  const handleMouseDown = (town: ITown) => {
    dispatch(setIsClicked(true));
    dispatch(clearTowns());

    if (isStart) {
      dispatch(setStartTown(town));
      dispatch(setStartTownTooltip(""));
      dispatch(setIsOpenedStartList(false));
      return;
    }

    dispatch(setEndTown(town));
    dispatch(setEndTownTooltip(""));
    dispatch(setIsOpenedEndList(false));
  };

  return (
    <ul className="towns">
      {towns.length ? (
        towns.map((town) => (
          <li
            key={town._id}
            className="towns__item"
            onMouseDown={() => handleMouseDown(town)}
          >
            {town.name}
          </li>
        ))
      ) : (
        <li className="towns__item towns__item_not-found">
          ничего не найдено...
        </li>
      )}
    </ul>
  );
};

export default Towns;