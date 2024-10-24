import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Headling/Headling';
import styles from './Success.module.css';

function Success() {
  const navigate = useNavigate();
  return (
    <div className={styles['success']}>
      <img src="/pizza.png" alt="Изображение пиццы" />
      <Heading className={styles['success__title']}>
        Ваш заказ успешно <br /> оформлен!
      </Heading>

      <Button appearence="big" onClick={() => navigate('/')}>
        Сделать новый
      </Button>
    </div>
  );
}

export default Success;
