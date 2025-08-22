import { isAfter, isBefore, isValid, parse, subYears } from 'date-fns';

const checkPassengerAge = (date: string, age: number) => {
  const parsedDate = parse(date, 'dd.MM.yyyy', new Date());
  const today = new Date();
  const minDate = subYears(today, age);

  const isValidDate =
    isValid(parsedDate) &&
    isBefore(parsedDate, today) &&
    isAfter(parsedDate, minDate);

  return isValidDate;
};

export default checkPassengerAge;