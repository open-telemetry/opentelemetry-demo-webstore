import styled from 'styled-components';
import RouterLink from 'next/link';

export const Link = styled(RouterLink)``;

export const Image = styled.div<{ $src: string }>`
  width: 100%;
  height: 150px;
  background: url(${({ $src }) => $src}) no-repeat center;
  background-size: 100% auto;

  ${({ theme }) => theme.breakpoints.desktop} {
    height: 300px;
  }
`;

export const ProductCard = styled.div`
  cursor: pointer;
`;

export const ProductName = styled.p`
  margin: 0;
  margin-top: 10px;
  font-size: ${({ theme }) => theme.sizes.dSmall};
`;

export const ProductPrice = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.sizes.dMedium};
  font-weight: ${({ theme }) => theme.fonts.bold};
`;
