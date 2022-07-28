import * as S from './Banner.styled';

const Banner = () => {
  return (
    <S.Banner>
      <S.ImageContainer>
        <S.BannerImg />
      </S.ImageContainer>
      <S.TextContainer>
        <S.Title>The best telescopes to see the world closer</S.Title>
        <S.GoShoppingButton>Go Shopping</S.GoShoppingButton>
      </S.TextContainer>
    </S.Banner>
  );
};

export default Banner;
