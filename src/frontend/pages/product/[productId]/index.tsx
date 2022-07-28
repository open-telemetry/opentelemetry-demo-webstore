import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import Ad from '../../../components/Ad';
import Footer from '../../../components/Footer';
import Layout from '../../../components/Layout';
import ProductPrice from '../../../components/ProductPrice';
import Recommendations from '../../../components/Recommendations';
import Select from '../../../components/Select';
import ApiGateway from '../../../gateways/Api.gateway';
import { Product } from '../../../protos/demo';
import AdProvider from '../../../providers/Ad.provider';
import { useCart } from '../../../providers/Cart.provider';
import * as S from '../../../styles/ProductDetail.styled';

const quantityOptions = new Array(10).fill(0).map((_, i) => i + 1);

const ProductDetail: NextPage = () => {
  const { push, query } = useRouter();
  const [quantity, setQuantity] = useState(1);
  const {
    addItem,
    cart: { items },
  } = useCart();
  const productId = query.productId as string;

  const {
    data: { name, picture, description, priceUsd = { units: 0, currencyCode: 'USD', nanos: 0 } } = {} as Product,
  } = useQuery(['product', productId], () => ApiGateway.getProduct(productId), { enabled: !!productId });

  const onAddItem = useCallback(async () => {
    await addItem({
      productId,
      quantity,
    });
    push('/cart');
  }, [addItem, productId, quantity, push]);

  return (
    <AdProvider productIds={[productId, ...items.map(({ productId }) => productId)]}>
      <Layout>
        <S.ProductDetail>
          <S.Container>
            <S.Image $src={picture} />
            <S.Details>
              <S.Name>{name}</S.Name>
              <S.Description>{description}</S.Description>
              <S.ProductPrice>
                <ProductPrice price={priceUsd} />
              </S.ProductPrice>
              <S.Text>Quantity</S.Text>
              <Select onChange={event => setQuantity(+event.target.value)} value={quantity}>
                {quantityOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <S.AddToCart onClick={onAddItem}>
                <Image src="/icons/Cart.svg" height="15px" width="15px" alt="cart" /> Add To Cart
              </S.AddToCart>
            </S.Details>
          </S.Container>
          <Recommendations />
        </S.ProductDetail>
        <Ad />
        <Footer />
      </Layout>
    </AdProvider>
  );
};

export default ProductDetail;
