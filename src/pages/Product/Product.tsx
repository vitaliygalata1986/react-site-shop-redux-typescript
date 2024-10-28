import styles from './Product.module.css';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
// import { Await, useLoaderData } from 'react-router-dom';
import { IProduct } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import Heading from '../../components/Headling/Headling';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { add } from '../../store/cart.slice';
import { AppDispath } from '../../store/store';
// import { Suspense } from 'react';

export function Product() {
  // const data = useLoaderData() as IProduct; // приведем useLoaderData к одному продукту, потому, что useLoaderData - unknown
  const data = useLoaderData() as { data: IProduct }; // так как мы уже возвращаем объект data: axios.get(`${PREFIX}/products/${params.id}`).then((data) => data)
  // throw new Error('error');
  // мы получаем data, когда промис развезолвится
  // перед тем, как получить данные - нужно что-то показать
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();

  return (
    <>
      <Suspense fallback={'Загружаю...'}>
        <Await resolve={data.data}>
          {(
            { data }: { data: IProduct } // получаем продукт
          ) => (
            <div className={styles['product-block']}>
              <div className={styles['product-top']}>
                <div className={styles['product-top-first']}>
                  <button
                    className={styles['product-prev']}
                    onClick={() => navigate(-1)}
                  >
                    <img src="/button_left.svg" alt="prev" />
                  </button>
                  <Heading>{data.name}</Heading>
                </div>
                <Button
                  appearence="big"
                  className={styles['product-buy']}
                  onClick={() => dispatch(add(data.id))}
                >
                  <img src="/cart-icon-white.svg" alt="cart icon" />В корзину
                </Button>
              </div>
              <div className={styles['product-bottom']}>
                <div className={styles['product-bottom__left']}>
                  <img
                    className={styles['product-bottom__image']}
                    src="/product-demo.png"
                    alt={data.name}
                  />
                </div>
                <div className={styles['product-bottom__right']}>
                  <div className={styles['product-bottom__right-top']}>
                    Цена
                    <div>
                      <span className={styles['product-price']}>
                        {data.price}
                      </span>
                      <span className={styles['product-valute']}> грн.</span>
                    </div>
                  </div>
                  <div
                    className={`${styles['product-bottom__right-top']} ${styles['product-bottom__right-top-bg']}`}
                  >
                    Рейтинг
                    <span className={styles['product-rayting']}>
                      {data.rating}
                      <img src="/cart-button-icon.svg" alt="Иконка звезды" />
                    </span>
                  </div>
                  <div className={styles['product-bottom__right-bottom']}>
                    Состав:
                    <ul className={styles['product-bottom__ingredient']}>
                      {data.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
}
