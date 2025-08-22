import React from 'react';
import Slider from '../../../UI/other/Slider';

import compartment from './img/compartment.svg';
import platzkart from './img/platzkart.svg';
import seat from './img/seat.svg';
import lux from './img/lux.svg';
import wiFi from './img/wi-fi.svg';
import express from './img/express.svg';

import './ArticleFeatures.css';

const ArticleFeatures = () => {
  return (
    <article className="features">
      <h3 className="visually-hidden">Настройка фич</h3>

      <ul className="features__list">
        <li className="features__item">
          <div className="features__wrapper">
            <div className="features__icon-wrapper">
              <img className="features__icon" src={compartment} alt="Купе" />
            </div>
            <p className="features__text">Купе</p>
          </div>
          <Slider forId="slider-compartment" />
        </li>

        <li className="features__item">
          <div className="features__wrapper">
            <div className="features__icon-wrapper">
              <img className="features__icon" src={platzkart} alt="Платцкарт" />
            </div>
            <p className="features__text">Платцкарт</p>
          </div>
          <Slider forId="slider-platzkart" />
        </li>

        <li className="features__item">
          <div className="features__wrapper">
            <div className="features__icon-wrapper">
              <img className="features__icon" src={seat} alt="Сидячий" />
            </div>
            <p className="features__text">Сидячий</p>
          </div>
          <Slider forId="slider-seat" />
        </li>

        <li className="features__item">
          <div className="features__wrapper">
            <div className="features__icon-wrapper">
              <img className="features__icon" src={lux} alt="Люкс" />
            </div>
            <p className="features__text">Люкс</p>
          </div>
          <Slider forId="slider-lux" />
        </li>

        <li className="features__item">
          <div className="features__wrapper">
            <div className="features__icon-wrapper">
              <img className="features__icon" src={wiFi} alt="Wi-Fi" />
            </div>
            <p className="features__text">Wi-Fi</p>
          </div>
          <Slider forId="slider-wiFi" />
        </li>

        <li className="features__item">
          <div className="features__wrapper">
            <div className="features__icon-wrapper">
              <img className="features__icon" src={express} alt="Экспресс" />
            </div>
            <p className="features__text">Экспресс</p>
          </div>
          <Slider forId="slider-express" />
        </li>
      </ul>
    </article>
  );
};

export default ArticleFeatures;