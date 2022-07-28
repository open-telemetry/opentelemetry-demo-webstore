import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 20px;

  ${({ theme }) => theme.breakpoints.desktop} {
    padding: 0 100px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  ${({ theme }) => theme.breakpoints.desktop} {
    margin-top: 100px;
  }
`;

export const HotProducts = styled.div`
  margin-bottom: 20px;

  ${({ theme }) => theme.breakpoints.desktop} {
    margin-bottom: 100px;
  }
`;

export const HotProductsTitle = styled.h1`
  font-size: ${({ theme }) => theme.sizes.mLarge};
  font-weight: ${({ theme }) => theme.fonts.bold};

  ${({ theme }) => theme.breakpoints.desktop} {
    font-size: ${({ theme }) => theme.sizes.dxLarge};
  }
`;

export const Home = styled.div`
  @media (max-width: 992px) {
    ${Content} {
      width: 100%;
    }
  }
`;
