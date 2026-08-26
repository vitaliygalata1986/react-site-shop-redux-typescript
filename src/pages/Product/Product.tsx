import styles from './Product.module.css';
import { useNavigate, useParams } from 'react-router-dom';
// import { Await, useLoaderData } from 'react-router-dom';
import { IProduct } from '../../interfaces/product.interface';
import { useEffect, useState } from 'react';
import Heading from '../../components/Headling/Headling';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { add } from '../../store/cart.slice';
import { AppDispath } from '../../store/store';
import axios from 'axios';
import { PREFIX } from '../../api/api';
// import { Suspense } from 'react';

export function Product() {
  // const data = useLoaderData() as IProduct; // приведем useLoaderData к одному продукту, потому, что useLoaderData - unknown
  // const data = useLoaderData() as { data: IProduct }; // так как мы уже возвращаем объект data: axios.get(`${PREFIX}/products/${params.id}`).then((data) => data)
  // throw new Error('error');
  // мы получаем data, когда промис развезолвится
  // перед тем, как получить данные - нужно что-то показать
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();
  const [product, setProduct] = useState<IProduct>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!id) {
      setError('Не найден id продукта');
      return;
    }

    const getProduct = async () => {
      try {
        setIsLoading(true);
        setError(undefined);
        const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);

        setProduct(data);
      } catch (e) {
        console.error(e);
        if (axios.isAxiosError(e)) {
          setError(e.message);
        } else if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (isLoading) {
    return <>Загружаю...</>;
  }

  if (error) {
    return <>Ошибка: {error}</>;
  }

  if (!product) {
    return <>Продукт не найден</>;
  }

  return (
    <div className={styles['product-block']}>
      <div className={styles['product-top']}>
        <div className={styles['product-top-first']}>
          <button
            className={styles['product-prev']}
            onClick={() => navigate(-1)}
          >
            <img
              src={`${import.meta.env.BASE_URL}button_left.svg`}
              alt="prev"
            />
          </button>
          <Heading>{product.name}</Heading>
        </div>
        <Button
          appearence="big"
          className={styles['product-buy']}
          onClick={() => dispatch(add(product.id))}
        >
          <img
            src={`${import.meta.env.BASE_URL}cart-icon-white.svg`}
            alt="cart icon"
          />
          В корзину
        </Button>
      </div>
      <div className={styles['product-bottom']}>
        <div className={styles['product-bottom__left']}>
          <img
            className={styles['product-bottom__image']}
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className={styles['product-bottom__right']}>
          <div className={styles['product-bottom__right-top']}>
            Цена
            <div>
              <span className={styles['product-price']}>{product.price}</span>
              <span className={styles['product-valute']}> грн.</span>
            </div>
          </div>
          <div
            className={`${styles['product-bottom__right-top']} ${styles['product-bottom__right-top-bg']}`}
          >
            Рейтинг
            <span className={styles['product-rayting']}>
              {product.rating}
              <img
                src={`${import.meta.env.BASE_URL}cart-button-icon.svg`}
                alt="Иконка звезды"
              />
            </span>
          </div>
          <div className={styles['product-bottom__right-bottom']}>
            Состав:
            <ul className={styles['product-bottom__ingredient']}>
              {product.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
useCallback нужен в основном из-за useEffect:
- если id не изменился, getProduct остаётся той же функцией
- значит useEffect не запускается заново из-за новой функции
- значит лишнего запроса не буде


Можно даже убрать id из зависимостей useEffect, потому что id уже есть в зависимостях useCallback. 
Когда id изменится, изменится getProduct, и useEffect запустится.
Итого:
- useCallback(..., [id]) говорит: пересоздай getProduct, только если изменился id
- useEffect(..., [getProduct]) говорит: запусти эффект, если изменилась getProduct
*/
