import styled from 'styled-components';
import Button from '../components/Button';

export const Cart = styled.div`
  margin: 24px;

  ${({ theme }) => theme.breakpoints.desktop} {
    margin: 100px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CarTitle = styled.h1`
  margin: 0;
`;

export const Header = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: start;

  ${({ theme }) => theme.breakpoints.desktop} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Title = styled.h1`
  text-align: center;
  margin: 0;
  font-size: ${({ theme }) => theme.sizes.mLarge};

  ${({ theme }) => theme.breakpoints.desktop} {
    font-size: ${({ theme }) => theme.sizes.dLarge};
  }
`;

export const Subtitle = styled.h3`
  text-align: center;
  margin: 0;
  font-size: ${({ theme }) => theme.sizes.mMedium};
  color: ${({ theme }) => theme.colors.textLightGray};

  ${({ theme }) => theme.breakpoints.desktop} {
    font-size: ${({ theme }) => theme.sizes.dMedium};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
  justify-content: center;
  margin-bottom: 120px;
  margin-top: 24px;

  ${({ theme }) => theme.breakpoints.desktop} {
    display: grid;
    grid-template-columns: auto;
  }
`;

export const EmptyCartButton = styled(Button)`
  font-weight: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.otelRed};
  padding: 0;

  ${({ theme }) => theme.breakpoints.desktop} {
    width: inherit;
  }
`;
