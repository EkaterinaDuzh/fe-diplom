const getSeatTypesCountPlatzkart = (
  seats: { index: number; available: boolean }[]
): { top: number; bottom: number; side: number } => {
  let top = 0;
  let bottom = 0;
  let side = 0;

  seats.forEach((seat) => {
    if (seat.available) {
      if (seat.index < 33) {
        if (seat.index % 2) {
          bottom++;
        } else {
          top++;
        }
      } else {
        side++;
      }
    }
  });

  return { top, bottom, side };
};

export default getSeatTypesCountPlatzkart;