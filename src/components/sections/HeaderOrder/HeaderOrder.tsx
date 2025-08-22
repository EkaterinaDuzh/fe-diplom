import Logo from '../../UI/other/Logo';
import Menu from '../Menu/Menu';

import './HeaderOrder.css';

const HeaderOrder = () => {
  return (
    <header className="header-order">
      <div className="header-order__top-container">
        <Logo />
      </div>
      <Menu />
      <h3 className="header-order__title">Благодарим Вас за заказ!</h3>
    </header>
  );
};

export default HeaderOrder;