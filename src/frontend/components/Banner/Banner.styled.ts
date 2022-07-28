import styled from 'styled-components';
import Button from '../Button';

export const Banner = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.desktop} {
    flex-direction: row-reverse;
    padding-bottom: 38px;
    background: ${({ theme }) => theme.colors.backgroundGray};
  }
`;

export const BannerImg = styled.img.attrs({
  src: '/images/Banner.png',
})`
  width: 100%;
  height: auto;
`;

export const ImageContainer = styled.div`
  ${({ theme }) => theme.breakpoints.desktop} {
    min-width: 50%;
  }
`;

export const TextContainer = styled.div`
  padding: 20px;

  ${({ theme }) => theme.breakpoints.desktop} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    width: 50%;
    padding: 100px 160px 100px 100px;
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.sizes.mxLarge};
  font-weight: ${({ theme }) => theme.fonts.bold};

  ${({ theme }) => theme.breakpoints.desktop} {
    font-size: ${({ theme }) => theme.sizes.dxLarge};
  }
`;

export const GoShoppingButton = styled(Button)`
  width: 100%;

  ${({ theme }) => theme.breakpoints.desktop} {
    width: auto;
  }
`;
