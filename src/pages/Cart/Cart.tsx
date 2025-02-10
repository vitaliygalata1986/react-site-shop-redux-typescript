import { useDispatch, useSelector } from 'react-redux';
import Heading from '../../components/Headling/Headling';
import { RootState } from '../../store/store';
import CardItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IProduct } from '../../interfaces/product.interface';
import { PREFIX } from '../../api/api';
import styles from '../../components/CartItem/CartItem.module.css';
import stylesCart from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { clean } from '../../store/cart.slice';

const DELIVERY = 100;

export function Cart() {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const dispatch = useDispatch();

  // получим состояние корзины
  const items = useSelector((s: RootState) => s.cart.items); // RootState - состояние
  const jwt = useSelector((s: RootState) => s.user.jwt); // RootState - состояние
  // console.log(items); // [{id: 1, count: 1}]
  // console.log(cartProducts); //  [{…}, {…}, {…}] {id: 1, name: 'Наслаждение', price: 300, ingredients: Array(4), …}

  const navigate = useNavigate();

  const total = items
    .map((i) => {
      const product = cartProducts.find((p) => p.id === i.id);
      //console.log(product);
      //console.log(i);
      if (!product) {
        // если продуктов в корзине нет, то возвращаем 0
        return 0;
      }
      return i.count * product.price;
    })
    // console.log(total); // [3600, 1400, 1280]
    // так как map вернул массив "300" "280" "320" - нам нужно пройтись по ниму, используя reduce
    .reduce((acc, i) => (acc += i), 0);

  // И зная id вытащим информацию об одном товаре из корзины.
  const getItem = async (id: number) => {
    const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
    return data;
  };

  /*
    Promise.all(items.map((i) => getItem(i.id))) принимает массив промисов, где каждый промис — это результат вызова функции getItem(i.id) для каждого элемента items.
    Promise.all возвращает единый промис, который выполняется, когда все промисы в массиве завершены успешно, или отклоняется, если хотя бы один из промисов отклонён.
    В случае успешного завершения всех промисов, результат (res) — массив объектов IProduct, где каждый объект соответствует товару в корзине, полученному из getItem.
    Таким образом, Promise.all здесь гарантирует, что loadAllItems загрузит данные о каждом товаре до того, как установит их в cartProducts.
  */

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id))); // передаем массив промисов, res будет содержать массив продуктов
    setCartProducts(res);
  };

  const checkout = async () => {
    // не принципиально, что вернет
    await axios.post(
      `${PREFIX}/order`,
      {
        products: items, //  products, потому, что так нужно в бек-енд данные передавать
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(clean());
    navigate('/success');
  };

  // получим все items в момент, когда у нас меняется items и мы находимся на этой страничке.
  // получив их = мы устанавливаем в локальное состояние cartProducts
  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <div className={styles['item__wrapper']}>
      <Heading className={stylesCart['item__title']}>Корзина</Heading>
      <div className={styles['item__element']}>
        {items.map((i) => {
          // console.log(i); // {id: 1, count: 1}
          const product = cartProducts.find((p) => p.id === i.id); // найдем продукт по id
          if (!product) {
            // если продукт не нашли, то возвращаем ничего
            return;
          }
          return <CardItem count={i.count} {...product} key={product.id} />;
        })}
      </div>
      <div className={stylesCart['item__table']}>
        <div className={stylesCart['item__table-el']}>
          <span className={stylesCart['item__table-info']}>Итог</span>
          <div className={stylesCart['item__table-price']}>
            <span>{total} </span>
            грн.
          </div>
        </div>
        <div className={stylesCart['item__table-el']}>
          <span className={stylesCart['item__table-info']}>Доставка</span>
          <div className={stylesCart['item__table-price']}>
            <span>{DELIVERY}</span> грн.
          </div>
        </div>
        <div className={stylesCart['item__table-el']}>
          <span className={stylesCart['item__table-info']}>
            Итог <span>({items.length})</span>
          </span>
          <div className={stylesCart['item__table-price']}>
            <span>{total + DELIVERY}</span> грн.
          </div>
        </div>
      </div>
      <div className={stylesCart['item__btn']}>
        <Button appearence='big' onClick={checkout}>
          Оформить
        </Button>
      </div>
    </div>
  );
}
