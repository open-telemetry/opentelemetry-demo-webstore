import { useAd } from '../../providers/Ad.provider';
import ProductCard from '../ProductCard';
import * as S from './Recommendations.styled';

const Recommendations = () => {
  const { recommendedProductList } = useAd();

  return (
    <S.Recommendations>
      <S.TitleContainer>
        <S.Title>You May Also Like</S.Title>
      </S.TitleContainer>
      <S.ProductList>
        {recommendedProductList.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </S.ProductList>
    </S.Recommendations>
  );
};

export default Recommendations;
