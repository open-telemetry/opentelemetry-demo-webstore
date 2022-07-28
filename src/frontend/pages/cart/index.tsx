import { NextPage } from 'next';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Recommendations from '../../components/Recommendations';
import * as S from '../../styles/Cart.styled';
import CartDetail from './CartDetail';
import EmptyCart from './EmptyCart';
import { useCart } from '../../providers/Cart.provider';
import AdProvider from '../../providers/Ad.provider';

const Cart: NextPage = () => {
  const {
    cart: { items },
  } = useCart();

  return (
    <AdProvider productIds={items.map(({ productId }) => productId)}>
      <Layout>
        <S.Cart>
          {(!!items.length && <CartDetail />) || <EmptyCart />}
          <Recommendations />
        </S.Cart>
        <Footer />
      </Layout>
    </AdProvider>
  );
};

export default Cart;
