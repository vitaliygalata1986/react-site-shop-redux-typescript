import { useEffect, useState } from 'react';
import { PREFIX } from '../../api/api';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { IProduct } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import MenuList from './MenuList/MenuList';

function Menu() {
  const [products, setProduct] = useState<IProduct[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const getMenu = async () => {
    /*
    try {
      const res = await fetch(`${PREFIX}/products`);
      if (!res.ok) {
        return;
      }
      const data = (await res.json()) as IProduct[]; // типизируем ответ от сервера - это будет массив продуктов
      console.log(data);
      setProduct(data);
    } catch (e) {
      console.error(e);
      return;
    }
      */

    try {
      setIsloading(true);
      const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`); // передаем дженерик - массив продуктов
      // console.log(data); // data (6) [{…}, {…}, {…}, {…}, {…}, {…}]
      setProduct(data);
      setIsloading(false);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        setError(e.message);
      }

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
        {error && <>{error}</>}
        {!isLoading && <MenuList products={products} />}

        {isLoading && <>Загружаем продукты...</>}
      </div>
    </>
  );
}

export default Menu;
