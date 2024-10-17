import { useSelector } from 'react-redux';
import Heading from '../../components/Headling/Headling';
import { RootState } from '../../store/store';
import CardItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IProduct } from '../../interfaces/product.interface';
import { PREFIX } from '../../api/api';
import styles from '../../components/CartItem/CartItem.module.css';

export function Cart() {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);

  // получим состояние корзины
  const items = useSelector((s: RootState) => s.cart.items); // RootState - состояние
  // console.log(items); // [{id: 1, count: 1}]

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

  // получим все items в момент, когда у нас меняется items и мы находимся на этой страничке.
  // получив их = мы устанавливаем в локальное состояние cartProducts
  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <div className={styles['item__wrapper']}>
      <Heading className="title">Корзина</Heading>
      <div className={styles['item__element']}>
        {items.map((i) => {
          console.log(i); // {id: 1, count: 1}
          const product = cartProducts.find((p) => p.id === i.id); // найдем продукт по id
          if (!product) {
            // если продукт не нашли, то возвращаем ничего
            return;
          }
          return <CardItem count={i.count} {...product} key={product.id} />;
        })}
      </div>
    </div>
  );
}
