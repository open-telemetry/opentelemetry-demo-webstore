import styled from 'styled-components';

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-columns: repeat(3, auto);
  }
`;
