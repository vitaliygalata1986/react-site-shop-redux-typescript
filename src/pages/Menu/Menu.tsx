import { ChangeEvent, useEffect, useState } from 'react';
// import { PREFIX } from '../../api/api';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { IProduct } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
// import axios, { AxiosError } from 'axios';
import MenuList from './MenuList/MenuList';
import { menuProducts } from './products';

const MENU_LOADING_DELAY = 500;

function Menu() {
	const [products, setProduct] = useState<IProduct[]>([]);
	const [isLoading, setIsloading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>('');

	// при первочной загрузке компонента вызываем нашу функцию получения товаров
	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const getMenu = async (name?: string) => {
		try {
			setIsloading(true);
			setError(undefined);
			await new Promise((resolve) => setTimeout(resolve, MENU_LOADING_DELAY));

			const normalizedName = name?.trim().toLowerCase();
			const filteredProducts = normalizedName
				? menuProducts.filter((product) => {
					const productName = product.name.toLowerCase();
					const ingredients = product.ingredients.join(' ').toLowerCase();

					return productName.includes(normalizedName) || ingredients.includes(normalizedName);
				})
				: menuProducts;

			setProduct(filteredProducts);
			setIsloading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof Error) {
				setError(e.message);
			}
			setIsloading(false);
			return;
		}
	};

	// const getMenu = async (name?: string) => {
	//   try {
	//     setIsloading(true);
	//     const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`, {
	//       // передаем дженерик - массив продуктов
	//       params: {
	//         name,
	//       },
	//     });
	//     // console.log(data); // data (6) [{…}, {…}, {…}, {…}, {…}, {…}]
	//     setProduct(data);
	//     setIsloading(false);
	//   } catch (e) {
	//     console.error(e);
	//     if (e instanceof AxiosError) {
	//       setError(e.message);
	//     }
	//     setIsloading(false);
	//     return;
	//   }
	// };

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	return (
		<>
			<div className={styles['head']}>
				<Headling>Меню</Headling>
				<Search
					type="search"
					placeholder="Введите блюдо или состав"
					onChange={updateFilter}
				/>
			</div>
			<div>
				{error && <>{error}</>}
				{!isLoading && products.length > 0 && <MenuList products={products} />}

				{isLoading && <>Загружаем продукты...</>}
				{!isLoading && products.length === 0 && (
					<p>Не найдено блюд по запросу</p>
				)}
			</div>
		</>
	);
}

export default Menu;
