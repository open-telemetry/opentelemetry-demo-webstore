import styled from 'styled-components';

export const CartItems = styled.section`
  display: flex;
  flex-direction: column;
`;

export const CardItemsHeader = styled.div`
  display: grid;
  grid-template-columns: 150px 100px auto;
  gap: 24px;

  ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-columns: 1fr auto auto;
  }
`;

export const CartItemImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;

  ${({ theme }) => theme.breakpoints.desktop} {
    width: 120px;
    height: 120px;
  }
`;

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 150px 100px auto;
  gap: 24px;
  padding: 24px 0;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textLightGray};

  ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-columns: 1fr auto auto;
  }
`;

export const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  flex-direction: column;
  cursor: pointer;

  ${({ theme }) => theme.breakpoints.desktop} {
    flex-direction: row;
    gap: 24px;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const DataRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 24px 0;
  gap: 24px;
`;

export const TotalText = styled.h3`
  margin: 0;
`;
