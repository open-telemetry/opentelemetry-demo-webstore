import { NextPage } from 'next';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';
import * as S from '../styles/Home.styled';
import { useQuery } from 'react-query';
import ApiGateway from '../gateways/Api.gateway';
import Banner from '../components/Banner';

const Home: NextPage = () => {
  const { data: productList = [] } = useQuery('products', ApiGateway.listProducts);

  return (
    <Layout>
      <S.Home>
        <Banner />
        <S.Container>
          <S.Row>
            <S.Content>
              <S.HotProducts>
                <S.HotProductsTitle>Hot Products</S.HotProductsTitle>
                <ProductList productList={productList} />
              </S.HotProducts>
            </S.Content>
          </S.Row>
        </S.Container>
        <Footer />
      </S.Home>
    </Layout>
  );
};

export default Home;
