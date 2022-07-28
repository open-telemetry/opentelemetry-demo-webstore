import { Product } from '../../protos/demo';
import ProductCard from '../ProductCard';
import * as S from './ProductList.styled';

interface IProps {
  productList: Product[];
}

const ProductList = ({ productList }: IProps) => {
  return (
    <S.ProductList>
      {productList.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </S.ProductList>
  );
};

export default ProductList;
