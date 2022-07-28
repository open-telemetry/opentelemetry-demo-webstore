import { Product } from '../../protos/demo';
import ProductPrice from '../ProductPrice';
import * as S from './ProductCard.styled';

interface IProps {
  product: Product;
}

const ProductCard = ({
  product: {
    id,
    picture,
    name,
    priceUsd = {
      currencyCode: 'USD',
      units: 0,
      nanos: 0,
    },
  },
}: IProps) => {
  return (
    <S.Link href={`/product/${id}`}>
      <S.ProductCard>
        <S.Image $src={picture} />
        <div>
          <S.ProductName>{name}</S.ProductName>
          <S.ProductPrice>
            <ProductPrice price={priceUsd} />
          </S.ProductPrice>
        </div>
      </S.ProductCard>
    </S.Link>
  );
};

export default ProductCard;
