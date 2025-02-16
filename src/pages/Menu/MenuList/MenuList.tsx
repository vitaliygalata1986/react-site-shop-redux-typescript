import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';
import styles from './MenuList.module.css';

function MenuList({ products }: MenuListProps) {
  return (
    <div className={styles.wrapper}>
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.ingredients.join(', ')}
            rating={product.rating}
            price={product.price}
            image={product.image}
          />
        );
      })}
    </div>
  );
}

export default MenuList;
