const transformCarriageSeats = (classType: string, availableCount: number) => {
  let maxCount = availableCount;

  switch (classType) {
    case 'first':
      maxCount = 16;
      break;
    case 'second':
      maxCount = 32;
      break;
    case 'third':
      maxCount = 48;
      break;
    case 'fourth':
      maxCount = 62;
      break;
  }

  const availableSeatsArray = Array.from({ length: maxCount }, (_, index) => ({
    index: index + 1,
    available: false,
    isActive: false,
  }));

  const indices = [...Array(maxCount).keys()];

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const availableIndexes = indices.slice(0, availableCount);

  availableSeatsArray.forEach((seat, index) => {
    if (availableIndexes.includes(index)) {
      seat.available = true;
    }
  });

  return availableSeatsArray;
};

export default transformCarriageSeats;