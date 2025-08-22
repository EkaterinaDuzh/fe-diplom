import './TooltipPrice.css';

interface ITooltipPriceProps {
  luxPrice?: number;
  topPrice?: number;
  bottomPrice?: number;
  sidePrice?: number;
}

const TooltipPrice = (props: ITooltipPriceProps) => {
  const { luxPrice, topPrice, bottomPrice, sidePrice } = props;

  return (
    <div className="tooltip-price">
      <div className="tooltip-price__arrow" />
      <ul className="tooltip-price__list">
        {}
        {luxPrice && luxPrice !== +Infinity && (
          <li className="tooltip-price__item">
            <span className="tooltip-price__text">люкс</span>
            <span className="tooltip-price__price-container">
              <span className="tooltip-price__price">{luxPrice}</span>
              <span className="tooltip-price__currency">₽</span>
            </span>
          </li>
        )}

        {}
        {topPrice && topPrice !== +Infinity && (
          <li className="tooltip-price__item">
            <span className="tooltip-price__text">верхние</span>
            <span className="tooltip-price__price-container">
              <span className="tooltip-price__price">{topPrice}</span>
              <span className="tooltip-price__currency">₽</span>
            </span>
          </li>
        )}

        {}
        {bottomPrice && bottomPrice !== +Infinity && (
          <li className="tooltip-price__item">
            <span className="tooltip-price__text">нижние</span>
            <span className="tooltip-price__price-container">
              <span className="tooltip-price__price">{bottomPrice}</span>
              <span className="tooltip-price__currency">₽</span>
            </span>
          </li>
        )}

        {}
        {sidePrice && sidePrice !== +Infinity && (
          <li className="tooltip-price__item">
            <span className="tooltip-price__text">боковые</span>
            <span className="tooltip-price__price-container">
              <span className="tooltip-price__price">{sidePrice}</span>
              <span className="tooltip-price__currency">₽</span>
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TooltipPrice;