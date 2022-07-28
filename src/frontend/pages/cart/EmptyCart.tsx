import Link from 'next/link';
import Button from '../../components/Button';
import * as S from '../../styles/Cart.styled';

const EmptyCart = () => {
  return (
    <S.EmptyCartContainer>
      <S.Title>Your shopping cart is empty!</S.Title>
      <S.Subtitle>Items you add to your shopping cart will appear here.</S.Subtitle>

      <S.ButtonContainer>
        <Link href="/">
          <Button type="submit">Continue Shopping</Button>
        </Link>
      </S.ButtonContainer>
    </S.EmptyCartContainer>
  );
};

export default EmptyCart;
