import { CardItemProps } from './CartItem.props';
import styles from './CartItem.module.css';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { remove, decrease, increase } from '../../store/cart.slice';
import { AppDispath } from '../../store/store';

function CardItem({ id, name, price, count }: CardItemProps) {
  const dispatch = useDispatch<AppDispath>();

  const increaseItem = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(increase(id));
  };

  const decreaseItem = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(decrease(id));
  };

  const removeItem = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(remove(id));
  };

  return (
    <div className={styles['item']}>
      <div className={styles['item__container']}>
        <div>
          <img
            src="/product-demo.png"
            alt={name}
            className={styles['item__img']}
          />
        </div>
        <div className={styles['item__description']}>
          <div className={styles['item__name']}>{name}</div>
          <div className={styles['item__price']}>
            {price}
            <span className={styles['item__currency']}>&nbsp;грн.</span>
          </div>
        </div>
      </div>
      <div className={styles['item__button']}>
        <button className={styles['item__minus']} onClick={decreaseItem}>
          <span>&#8722;</span>
        </button>
        <span className={styles['item__count']}>{count}</span>
        <button className={styles['item__plus']} onClick={increaseItem}>
          <span>&#43;</span>
        </button>
        <button className={styles['item__remove']} onClick={removeItem}>
          {' '}
          <img
            className={styles['item__delete']}
            src="delete.svg"
            alt="Иконка удаления товара"
          />
        </button>
      </div>
    </div>
  );
}

export default CardItem;
