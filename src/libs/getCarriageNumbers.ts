const getCarriageNumbers = (length: number) => {
  const carriageNumbers = [...Array(15)].map((_, index) => index + 1);

  const uniqueCarriageNumbers = [...carriageNumbers];

  for (let i = uniqueCarriageNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uniqueCarriageNumbers[i], uniqueCarriageNumbers[j]] = [
      uniqueCarriageNumbers[j],
      uniqueCarriageNumbers[i],
    ];
  }

  const availableCarriageNumbersArray = uniqueCarriageNumbers.slice(0, length);

  return availableCarriageNumbersArray;
};

export default getCarriageNumbers;