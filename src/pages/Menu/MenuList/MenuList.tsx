import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';

function MenuList({ products }: MenuListProps) {
  return products.map((product) => {
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
  });
}

export default MenuList;
