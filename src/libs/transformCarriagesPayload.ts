import getCarriageNumbers from './getCarriageNumbers';
import getSeatTypesCountCompartment from './getSeatTypesCountCompartment';
import getSeatTypesCountPlatzkart from './getSeatTypesCountPlatzkart';
import transformCarriageSeats from './transformCarriageSeats';
import { ICarriage } from '../models/models';

const transformCarriagesPayload = (payload: ICarriage[]) => {
  const newPayload = JSON.parse(JSON.stringify(payload));

  const carriageNumbersArray = getCarriageNumbers(newPayload.length);

  newPayload.map(
    (item: ICarriage, index: number) =>
      (item.coach.carriage_number = carriageNumbersArray[index])
  );

  const classPriority = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
  };

  newPayload.sort((a: ICarriage, b: ICarriage) => {
    const classA: keyof typeof classPriority = a.coach
      .class_type as keyof typeof classPriority;

    const classB: keyof typeof classPriority = b.coach
      .class_type as keyof typeof classPriority;

    const classTypeComparison = classPriority[classA] - classPriority[classB];

    if (classTypeComparison !== 0) {
      return classTypeComparison;
    }

    return a.coach.carriage_number - b.coach.carriage_number;
  });

  newPayload.map(
    (item: ICarriage) =>
      (item.seats = transformCarriageSeats(
        item.coach.class_type,
        item.coach.available_seats
      ))
  );

  newPayload.map((item: ICarriage) => {
    if (item.coach.class_type === 'second') {
      const seatTypes = getSeatTypesCountCompartment(item.seats);
      item.coach.top = seatTypes.top;
      item.coach.bottom = seatTypes.bottom;
    } else if (item.coach.class_type === 'third') {
      const seatTypes = getSeatTypesCountPlatzkart(item.seats);
      item.coach.top = seatTypes.top;
      item.coach.bottom = seatTypes.bottom;
      item.coach.side = seatTypes.side;
    }
  });

  return newPayload;
};

export default transformCarriagesPayload;