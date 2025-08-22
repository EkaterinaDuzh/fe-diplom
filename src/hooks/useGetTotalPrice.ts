import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useGetTotalPrice = () => {
  const { orderList: departureOrderList } = useSelector(
    (state: RootState) => state.departure
  );

  const { orderList: arrivalOrderList } = useSelector(
    (state: RootState) => state.arrival
  );

  const price = useMemo(() => {
    const departurePrice = departureOrderList.reduce(
      (acc, item) => acc + item.total_price,
      0
    );

    const arrivalPrice = arrivalOrderList.reduce(
      (acc, item) => acc + item.total_price,
      0
    );

    return departurePrice + arrivalPrice;
  }, [departureOrderList, arrivalOrderList]);

  return price;
};

export default useGetTotalPrice;