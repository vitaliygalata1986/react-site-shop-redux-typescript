import { ProductCardProps } from './ProductCard.props';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';

function ProductCard({
  id,
  name,
  price,
  description,
  image,
  rating,
}: ProductCardProps) {
  return (
    <Link to={`/product/${id}`} className={styles['card']}>
      <div
        className={styles['card__head']}
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className={styles['card__price']}>
          {price}
          <span className={styles['card__currency']}>&nbsp;грн.</span>
        </div>
        <button className={styles['card__buy']}>
          <img src="cart-icon-button.svg" alt="Добавить в корзину" />
        </button>
        <div className={styles['card__rayting']}>
          {rating}&nbsp;
          <img src="cart-button-icon.svg" alt="Иконка звезды" />
        </div>
      </div>
      <div className={styles['card__footer']}>
        <div className={styles['card__title']}>{name}</div>
        <div className={styles['card__description']}>{description}</div>
      </div>
    </Link>
  );
}

export default ProductCard;
