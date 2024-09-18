import { useEffect, useState } from 'react';
import { PREFIX } from '../../api/api';
import Headling from '../../components/Headling/Headling';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios from 'axios';

export function Menu() {
  const [products, setProduct] = useState<Product[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const getMenu = async () => {
    /*
    try {
      const res = await fetch(`${PREFIX}/products`);
      if (!res.ok) {
        return;
      }
      const data = (await res.json()) as Product[]; // типизируем ответ от сервера - это будет массив продуктов
      console.log(data);
      setProduct(data);
    } catch (e) {
      console.error(e);
      return;
    }
      */

    try {
      setIsloading(true);
      // иммитация зажержки, а только потом будем запрашивать данные
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`); // передаем дженерик - массив продуктов
      // console.log(data); // data (6) [{…}, {…}, {…}, {…}, {…}, {…}]
      setProduct(data);
      setIsloading(false);
    } catch (e) {
      console.error(e);
      setIsloading(false);
      return;
    }
  };

  // при первочной загрузке компонента вызываем нашу функцию
  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <div className={styles['head']}>
        <Headling>Меню</Headling>
        <Search type="search" placeholder="Введите блюдо или состав" />
      </div>
      <div>
        {!isLoading &&
          products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.ingredients.join(', ')}
                rating={product.rating}
                price={product.price}
                image="/product-demo.png"
              />
            );
          })}

        {isLoading && <>Загружаем продукты...</>}
      </div>
    </>
  );
}
