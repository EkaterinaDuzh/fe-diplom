import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../redux/store';
import { openModal } from '../../../redux/modalSlice';
import { sendOrder } from '../../../redux/orderSlice';
import useGetFinalData from '../../../hooks/useGetFinalData';
import ArticleCheckPassengers from '../../widgets/Article/ArticleCheckPassengers/ArticleCheckPassengers';
import ArticleCheckPayment from '../../widgets/Article/ArticleCheckPayment/ArticleCheckPayment';
import ArticleCheckTrain from '../../widgets/Article/ArticleCheckTrain/ArticleCheckTrain';
import NextPage from '../../UI/button/NextPage';
import './SectionConfirmation.css';

const SectionConfirmation = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { orderIsLoading, orderHasError } = useSelector(
    (state: RootState) => state.order
  );

  const data = useGetFinalData();

  const handleOnNextClick = async () => {
    await dispatch(sendOrder(JSON.stringify(data)));

    if (!orderIsLoading) {
      if (!orderHasError) {
        navigate('/order');
      } else {
        const modalOptions = {
          type: 'error',
          title: 'Произошла ошибка при отправке данных на сервер!',
          text: 'Попробуйте повторить ваш запрос позже!',
        };

        dispatch(openModal(modalOptions));
      }
    }
  };

  return (
    <section className="confirmation">
      <h2 className="visually-hidden">Подтверждение заказа</h2>
      <ArticleCheckTrain />
      <ArticleCheckPassengers />
      <ArticleCheckPayment />
      <NextPage
        text="подтвердить"
        isActive={true}
        onNextClick={handleOnNextClick}
      />
    </section>
  );
};

export default SectionConfirmation;