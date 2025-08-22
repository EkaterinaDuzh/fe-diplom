import loader from './img/loader.gif';
import './Loader.css';

const Loader = () => {
  return <img className="loader" src={loader} alt="Идёт загрузка" />;
};

export default Loader;